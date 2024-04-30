<script>
  import * as d3 from "d3";

  import data from "./pbility.json";
  import { onDestroy, onMount } from "svelte";

  import Svelecte from "svelecte";

  //index titles for choice
  $: console.log(
    data.map(function (value) {
      return value.index;
    })
  );

  var ray = data.map(function (value) {
    return value.index;
  });

  // set the dimensions and margins of the graph
  var margin = { top: 80, right: 30, bottom: 50, left: 110 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const lista = ray;
  const listb = ray;
  let aValue = null;
  let bValue = null;

  // Log selected ranges

  $: console.log(aValue);
  $: console.log(bValue);

  let numba = 0;
  let numbb = 1;
  let svgNode;
  $: obj = Object.values(data[numba]) || [];
  $: objb = Object.values(data[numbb]) || [];

  //$: console.log("obi", obj);
  //$: console.log(objb);

  //x & y

  const x = d3.scaleLinear().domain([0, 200]).range([0, width]);

  const y = d3.scaleLinear().range([height, 0]).domain([0, 0.05]);
  // Compute kernel density estimation
  const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40));
  $: density1 = kde(obj);
  $: density2 = kde(objb);

  const densityToPath = d3
    .line()
    .curve(d3.curveBasis)
    .x(function (d) {
      return x(d[0]);
    })
    .y(function (d) {
      return y(d[1]);
    });
  $: density1path = densityToPath(density1);
  $: density2path = densityToPath(density2);

  //Change val and update chart
  function changeGlobal(newVal) {
    numba = newVal;
  }

  function changeBlobal(newVal) {
    numbb = newVal;
  }

  function chng() {
    if (aValue != null) {
      console.log("spaciba");
      var denIndx = ray.indexOf(aValue);
      console.log(denIndx);
      changeGlobal(denIndx);
      // const dUpdate = d3.selectAll('.route-one').remove();
      // this function can stop heere

      d3.selectAll(".path-1").join(
        function (enter) {
          console.log("entered route one", obj);
          return enter
            .text(obj[0])
            .datum(density1)
            .attr(
              "d",
              d3
                .line()
                .curve(d3.curveBasis)
                .x(function (d) {
                  return x(d[0]);
                })
                .y(function (d) {
                  return y(d[1]);
                })
            );
        },
        function (update) {
          return update
            .text(obj[numba])
            .datum(density1)
            .attr(
              "d",
              d3
                .line()
                .curve(d3.curveBasis)
                .x(function (d) {
                  return x(d[0]);
                })
                .y(function (d) {
                  return y(d[1]);
                })
            );
        }
      );
    }
  }

  function chngb() {
    if (bValue != null) {
      console.log("spaciba");
      var denIndx = ray.indexOf(bValue);
      console.log(denIndx);
      changeBlobal(denIndx);
      // const dUpdate = d3.selectAll('.route-one').remove();
      // this function can stop heere

      d3.selectAll(".path-2").join(
        function (enter) {
          console.log("entered route two", objb);
          return enter
            .text(objb[0])
            .datum(density2)
            .attr(
              "d",
              d3
                .line()
                .curve(d3.curveBasis)
                .x(function (d) {
                  return x(d[0]);
                })
                .y(function (d) {
                  return y(d[1]);
                })
            );
        },
        function (update) {
          return update
            .text(objb[numbb])
            .datum(density2)
            .attr(
              "d",
              d3
                .line()
                .curve(d3.curveBasis)
                .x(function (d) {
                  return x(d[0]);
                })
                .y(function (d) {
                  return y(d[1]);
                })
            );
        }
      );
    }
  }

  // Find index of vals

  // append the svg object to the body of the page

  onMount(() => {
    /*var svg = d3
      .select("#attach-here")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //          async () => {
    //			data = await d3.csv('https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv')
    //		}
*/
    //check data
    console.log(data);

    // add the x Axis

    const svg = d3.select(svgNode);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis

    svg.append("g").call(d3.axisLeft(y));

    //select densities

    // Plot the area
    /*
    const p1 = svg.append("g").attr("class", "path-1");
    p1.append("path")
      .attr("class", "mypath1")
      .attr("fill", "#69b3a2")
      .attr("opacity", ".3")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .datum(density1)
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveBasis)
          .x(function (d) {
            return x(d[0]);
          })
          .y(function (d) {
            return y(d[1]);
          })
      );
    p1.append("text")
      .text(obj[0])
      .attr("class", "route-one")
      .style("fill", "#69b3a2");
*/
    

  });

  // Function to compute density
  function kernelDensityEstimator(kernel, X) {
    console.log("X", X);
    return function (V) {
      return X.map(function (x) {
        return [
          x,
          d3.mean(V, function (v) {
            return kernel(x - v);
          }),
        ];
      });
    };
  }
  function kernelEpanechnikov(k) {
    return function (v) {
      return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
  }
</script>

<form style="display:block;">
  <label text="input 1">input 1</label>

  <Svelecte options={lista} bind:value={aValue} on:change={chng}></Svelecte>
  <Svelecte options={listb} bind:value={bValue} on:change={chngb}></Svelecte>
</form>

<div>
  <svg
    width={width + margin.left + margin.right}
    height={height + margin.top + margin.bottom}
  >
    <g transform="translate({margin.left},{margin.top})" bind:this={svgNode}>
      <g>
        <path
          fill="#69b3a2"
          opacity=".3"
          stroke="#000"
          stroke-width="2"
          stroke-linejoin="round"
          d={density1path}
        >
        </path>
        <text style="fill: #69b3a2;">{obj[0]}</text>
      </g>
    </g>

    <g transform="translate({margin.left},{margin.top})" bind:this={svgNode}>
      <g>
        <path
          fill="blue"
          opacity=".3"
          stroke="#000"
          stroke-width="2"
          stroke-linejoin="round"
          d={density2path}
        >
        </path>
        <text style="fill: blue;" transform="translate({margin.left+50})">{objb[0]}</text>
      </g>
    </g>
  </svg>
</div>

<style>
  :global(.node) {
    font: 0.6em sans-serif;
  }

  :global(.link) {
    stroke: steelblue;
    stroke-opacity: 0.5;
    fill: none;
    pointer-events: none;
    stroke-linejoin: miter;
  }
</style>
