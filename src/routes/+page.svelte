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




//test text
  d3.select("g").append("text")
  .text("oi moi");
  d3.select("g").append("text")
  .data(data)
  .text( function (d){return d['index']});

   // Get the different categories and count them
   var categories = ["Almost Certainly", "Very Good Chance", "We Believe", "Likely", "About Even", "Little Chance", "Chances Are Slight", "Almost No Chance" ]
  var n = categories.length



  // Add X axis
  var x = d3.scaleLinear()
    .domain([-10, 120])
    .range([ 0, width ]);
  svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickValues([0,25, 50, 75, 80]).tickSize(-height) )
    .select(".domain").remove()

    // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + 40)
      .text("Probability (%)");

      // Create a Y scale for densities
  var y = d3.scaleLinear()
    .domain([0, 0.25])
    .range([ height, 0]);

     // Create the Y axis for names
  var yName = d3.scaleBand()
    .domain(categories)
    .range([0, height])
    .paddingInner(1)
  svg.append("g")
    .call(d3.axisLeft(yName).tickSize(0))
    .select(".domain").remove()


    // Compute kernel density estimation for each column:
//  var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
  var allDensity = []


  allDensity.push(data.map(function(d){  return toString(d[0]); }))

// allDensity.push({key: key, density: density});
// for (i = 0; i < n; i++) {
//key = categories[i]
//      density = kde( data.map(function(d){  return d[key]; }) )
//     allDensity.push({key: key, density: density})
//  }

//check data


$: console.log(allDensity)





  // Add areas
  svg.selectAll("areas")
    .data(data)
    .enter()
    .append("path")
      .attr("transform", data.map(function(d){return("translate(0," + (d.k1) +")" )}))
      .attr("fill", "#000")
      .datum(function(d){return d['k1']})
      .attr("opacity", 0.7)
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("d",  d3.line()
          .curve(d3.curveBasis)
          .x(function(d) { return x(d.key); })
          .y(function(d) { return y(d.key+2); })
      )

   
  

})

// This is what I need to compute kernel density estimation
//function kernelDensityEstimator(kernel, X) {
//  return function(V) {
//    return X.map(function(x) {
//      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
//    });
//  };
//}
//function kernelEpanechnikov(k) {
//  return function(v) {
//    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
//  };
//}
  
  </script>
  
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