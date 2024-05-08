<script>
  import { area, curveBasis, extent, max, quantize, interpolateCool, scaleLinear, scalePoint, scaleTime} from 'd3';
  import data from './ridgeline-data' // or pass data to component as prop
  import { fade, blur, fly, slide, scale } from "svelte/transition";
  import * as easingFunctions from 'svelte/easing';
  import { flip } from 'svelte/animate';

  
  const width = 1200; // the outer width of the chart, in pixels 
  const overlap = 1; // the overlap between each ridgeline
  let verticalScale = 50; // the vertical spacing between each y axis ticks
  let height = data.series.length * verticalScale;
  const marginTop = 40; // the top margin, in pixels
  const marginRight = 0; // the right margin, in pixels
  const marginBottom = 40; // the bottom margin, in pixels
  const marginLeft = 100; // the left margin, in pixels
  const yAxisOffset = -5; // vertical offset of y-axis labels, in pixels
  let Track = ''
  let Cola = 'rgb(54, 140, 225)'
  let Pat = ''
  let hScale = 1

	let show = true

  console.log("data:", data.kms);

  const xScale = scaleLinear()
    .domain(data.kms)
    .range([30,60, 75
    ]);

    //[fwidth, width - marginRight-15 or 20, 45 , marginLeft]

  const yScale = scalePoint()
    .domain(data.series.map(d => d.name))
    .range([marginTop, height - marginBottom]);

  const zScale = scaleLinear()
    .domain([0, max(data.series, d => max(d.values))]).nice()
    .range([0, -overlap * yScale.step()]);

  const xTicks = xScale.ticks(width / 100);
  const xTicksFormatted = xTicks.map(xScale.tickFormat());

  const colors = quantize(t => interpolateCool(t * 1 + 0.3), data.series.length);

  const areaFunc = area()
    .curve(curveBasis)
    .defined(d => !isNaN(d))
    .x((d, i) => xScale(data.kms[i]))
    .y0(0)
    .y1(d => zScale(d));

        
  const lineFunc = areaFunc.lineY1();

//  function myFunction() {
//  console.log("i've been clicked")
//};



let active = false, navigating = false;

function simulateNavigation() {		
		navigating = true
		console.log("clicked", navigating);
		setTimeout(() => { // Reset
			navigating = false;
			active = false;
      alert(`This is ${Track}`);
		}, 2000)
	};


</script>


<h1 class:active on:mouseenter={() => {
	console.log("enter", navigating);
	if (!navigating) {
		active = true;
	}
}}
on:mouseleave={() => {
	console.log("leave", navigating);
	if (!navigating) {
		active = false;
	}
}} style="color:{Cola};" >Pick your Great Walk: {Track}</h1>

<pre>
  Active: {active}
  Navigating: {navigating}
  Track: {Track}
  Fill: {Cola}
  Path: {Pat}
</pre>
  
<div class="scatter_plot_container">
  <svg {width} {height} viewBox="0 0 {width + marginLeft} {height}">
    <g class="y-axis" transform="translate({marginLeft}, 0)">
      {#each data.series as series, i}
        <g class="y-tick" transform="translate({marginLeft - 50}, {yScale(series.name)})">
          <text x="-50" y={yAxisOffset}>{series.name}</text>
          <line class="tick-start" x1={marginLeft - 6} x2={marginLeft}/>
          <line class="tick-grid" x1={marginLeft} x2={width - marginLeft - marginRight}/>
          
        </g>
      {/each}
    </g>

    <g class="x-axis" transform="translate(0,{height - marginBottom})">
      {#each xTicks as tick, i}
        <g class="x-tick" transform="translate({marginLeft + xScale(tick)}, 0)">
          <line class="tick-start" stroke='black' y2='6' />
            <text y="10">{xTicksFormatted[i]}</text>
        </g>
      {/each}
    </g>
      
      {#each data.series as series, i}
        <g class='ridgelines' transform="translate({marginLeft} , {yScale(series.name) + 1})">
          <path 

              d={areaFunc(series.values)}
              on:mouseenter={() => {
                console.log("enter", navigating);
                if (!navigating) {
                  active = true;
                }
              }} 
              on:mouseleave={() => {
                console.log("leave", navigating);
                if (!navigating) {
                  active = false;
                }
              }} on:click={(event) => Track = event.target.id} on:click={simulateNavigation}
              on:mouseenter|self={(event) => event.target.style.transform = "scaleY(1.5)" }
         
              
              on:mouseleave|self={(event) => event.target.style.transform = "scaleY(1)"}
              on:mouseenter={(event) => Cola = event.target.attributes["fill"].value}
              on:mouseenter={(event) => Pat = event.target.attributes["d"].value}
              fill={colors[i]}
              name={colors[i]}
              id={series.name}
              cursor = pointer

                            
          ></path>
          
<!--    // This below: use navigating to bring up huts data / outline for selected
        {#if navigating}
          <path
              stroke='black'
              fill='none'
              d={lineFunc(series.values)}
              in:fade={{ duration: 2000 }}
              out:fade={{ duration: 2000 }}></path>

          
          {:else}
          
          {/if}
            -->

            {#if navigating}
            {(event) => event.target.style.stroke = 'black'
            
             }
          
          {:else}
          
          {/if}


        </g>
        
      {/each}
  </svg>
</div>

<style>
  svg {
    max-width: 100%;
    height: auto;
    height: "intrinsic";
  }

  .y-axis {
    font-size: "10px";
    font-family: sans-serif;
    text-anchor: "end";
  }

  .x-axis {
    font-size: "10px";
    font-family: sans-serif;
    text-anchor: "end";
  }

  .tick-start {
    stroke: black;
    stroke-opacity: 1;
  }

  .tick-grid {
    stroke: black;
    stroke-opacity: 0.2;
    font-size: "11px";
    color: black;
  }

  .x-tick text {
    fill: black;
    text-anchor: middle;
  }

  .y-tick text {
    fill: black;
    text-anchor: end;
  }

  .Bctive {
	background: rgb(54, 140, 225);
}
</style>