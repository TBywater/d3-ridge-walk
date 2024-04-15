<script>

  import * as d3 from "d3"
  
  import data from "./pbility.json"
      import { onMount } from "svelte";



  
  // set the dimensions and margins of the graph
var margin = {top: 80, right: 30, bottom: 50, left:110},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page

  onMount(() => {
var svg = d3.select("#attach-here").append("svg")
.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
//          async () => {
//			data = await d3.csv('https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv')
//		}

 //check data
  $: console.log(data)



// add the x Axis
var x = d3.scaleLinear()
            .domain([0, 200])
            .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 0.05]);
  svg.append("g")
      .call(d3.axisLeft(y));

      var obj = Object.values(data[0]);
      var objb = Object.values(data[1]);
      
      $: console.log(obj)
      $: console.log(objb)
      

      // Compute kernel density estimation
  var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))
  var density1 =  kde( obj )
  var density2 =  kde( objb )
  
  $: console.log(density1)

  // Plot the area
  svg.append("path")
      .attr("class", "mypath")
      .datum(density1)
      .attr("fill", "#69b3a2")
      .attr("opacity", ".3")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      )
      svg.append("text")
      .text(obj[0])
      .attr("y", obj[5]);

    svg.append("path")
      .attr("class", "mypath")
      .datum(density2)
      .attr("fill", "pink")
      .attr("opacity", ".3")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      )
      svg.append("text")
      .text(objb[0])
      .attr("x", 200)
      .attr("y", objb[5]);

})

// Function to compute density
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
    });
  };
}
function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}

  
  </script>

  <form>
    <label text="input 1">input 1</label>
    <input>
    <label text="input 2">input 2</label>
    <input>
  </form>
  
  <div id="attach-here"></div>
  
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