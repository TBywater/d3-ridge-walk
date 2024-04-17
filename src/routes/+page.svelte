<script>

  import * as d3 from "d3"
  
  import data from "./pbility.json"
      import { onDestroy, onMount } from "svelte";

      import Svelecte from 'svelecte';

//index titles for choice
      $: console.log(data.map( function( value) { return value.index
}))

var ray = data.map( function( value) { return value.index
});


  // set the dimensions and margins of the graph
  var margin = {top: 80, right: 30, bottom: 50, left:110},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


const lista = ray
const listb = ray
let aValue = null;
let bValue = null;

// Log selected ranges

$: console.log(aValue);
$: console.log(bValue);

var numba = 0;
var numbb = 1; 

var obj = Object.values(data[numba]);

var objb = Object.values(data[numbb]);

$: console.log(obj)
$: console.log(objb)


//x & y

var x = d3.scaleLinear()
            .domain([0, 200])
            .range([0, width]);

var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 0.05]);            

     // Compute kernel density estimation
     var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))
  var density1 =  kde( obj )
  var density2 =  kde( objb )



//Change val and update chart
function changeGlobal(newVal){numba = newVal};

function chng(){

if (aValue != null){

  console.log("spaciba");
  var denIndx = ray.indexOf(aValue);
  console.log(denIndx);
  changeGlobal(denIndx);
// const dUpdate = d3.selectAll('.route-one').remove();



d3.selectAll('.route-one').join(
  function(enter) {
    return enter
      .text(obj[0])
      .datum(density1)
      .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      );
  
  },
  function(update) {
    return update.text(obj[numba])
    .datum(density2)
    .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      );
   
  }
)

}

$: console.log(numba);

                }



// Find index of vals

  

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

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis

  svg.append("g")
      .call(d3.axisLeft(y));

      //select densities

  
  $: console.log(density1)
 

  // Plot the area
  svg.append("path")
      .attr("class", "mypath1")
      .attr("fill", "#69b3a2")
      .attr("opacity", ".3")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .datum(density1)
      .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      )
      svg.append("text")
      .text(obj[0])
      .attr("class","route-one")
      .style("fill", "#69b3a2");

    svg.append("path")
      .attr("class", "mypath2")
      .attr("fill", "pink")
      .attr("opacity", ".3")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .datum(density2)
      .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      )
      svg.append("text")
      .text(objb[0])
      .attr("x", 200)
      .attr("y", objb[1])
      .attr("class","route-two")
      .style("fill", "pink");

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

  <form style="display:block;">
    <label text="input 1">input 1</label>

    <Svelecte options={lista} bind:value={aValue} on:change={chng}></Svelecte>
    <Svelecte options={listb} bind:value={bValue}></Svelecte>
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