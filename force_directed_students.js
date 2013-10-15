<!DOCTYPE html>
<meta charset="utf-8">
<style>
  
div.tooltip {   
 position: absolute;           
 text-align: right;
 z-index:9999;
 width: 6px;                  
 height: 18px;                 
 padding: 15px;             
 font: 15px sans-serif;        
 background: transparent;   
 pointer-events: none;         
}
  
.link {
 stroke: #ddd;
 stroke-opacity: 0.8;
 fill: none;
}

.node{
 stroke-width: 0.5px;
}

</style>
<script src="/s/d3min.js"></script>
<script>

// initialize variables
var width = 800,
   height = 600;

var color = d3.scale.category20();

var force = d3.layout.force()
   .charge(-100)
   .theta(1.5)
   .gravity(0.05)
   .linkDistance(function(d){return(150*(1+d.cor)^2);})
   .size([width, height])
   .friction(0.9)
   .start();

// set SVG container size
var svg = d3.select("#test").append("svg")
   .attr("width", width)
   .attr("height", height);

var tooltip = d3.select("body").append("div")   
   .attr("class", "tooltip")   
   .style("font-size","15px") 

// I would have saved this json as a .json file elsewhere and linked to it, but I struggled with linking to it on my blog
// It works fine when running on a local server
var json = {
"nodes":
[
  {	  "group" : "SkipClass",	    "size" : 108	},
  {		"group" : "FakeID",	  	    "size" : 150	},
  {		"group" : "CheatedPartner",	"size" : 222  },	
  {		"group" : "SmokeCig",	      "size" : 95	},	
  {		"group" : "SmokedMJ",	      "size" : 368	},
  {		"group" : "CheatedExam",    "size" : 93	},	
  {		"group" : "LowGPA",		      "size" : 53	},	
  {		"group" : "MedGPA",		      "size" : 548	},
  {	  "group" : "HighGPA",	      "size" : 299 }
],
"links":[
	{
		"cor" : 0.69259,
		"source" : 0,
		"target" : 1
	},
	{
		"cor" : 0.7358,
		"source" : 0,
		"target" : 2
	},
	{
		"cor" : 0.85945,
		"source" : 1,
		"target" : 2
	},
	{
		"cor" : 0.72443,
		"source" : 0,
		"target" : 3
	},
	{
		"cor" : 0.47864,
		"source" : 1,
		"target" : 3
	},
	{
		"cor" : 0.569,
		"source" : 2,
		"target" : 3
	},
	{
		"cor" : 0.85114,
		"source" : 0,
		"target" : 4
	},
	{
		"cor" : 0.82728,
		"source" : 1,
		"target" : 4
	},
	{
		"cor" : 0.8481,
		"source" : 2,
		"target" : 4
	},
	{
		"cor" : 1,
		"source" : 3,
		"target" : 4
	},
	{
		"cor" : 0.72841,
		"source" : 0,
		"target" : 5
	},
	{
		"cor" : 0.71436,
		"source" : 1,
		"target" : 5
	},
	{
		"cor" : 0.65598,
		"source" : 2,
		"target" : 5
	},
	{
		"cor" : 0.74432,
		"source" : 3,
		"target" : 5
	},
	{
		"cor" : 0.61797,
		"source" : 4,
		"target" : 5
	},
	{
		"cor" : 0.56937,
		"source" : 0,
		"target" : 6
	},
	{
		"cor" : 0.47771,
		"source" : 1,
		"target" : 6
	},
	{
		"cor" : 0.70632,
		"source" : 2,
		"target" : 6
	},
	{
		"cor" : 0.38034,
		"source" : 3,
		"target" : 6
	},
	{
		"cor" : 0.48189,
		"source" : 4,
		"target" : 6
	},
	{
		"cor" : 0.38575,
		"source" : 5,
		"target" : 6
	},
	{
		"cor" : 0.61241,
		"source" : 0,
		"target" : 7
	},
	{
		"cor" : 0.49707,
		"source" : 1,
		"target" : 7
	},
	{
		"cor" : 0.39016,
		"source" : 2,
		"target" : 7
	},
	{
		"cor" : 0.66394,
		"source" : 3,
		"target" : 7
	},
	{
		"cor" : 0.54786,
		"source" : 4,
		"target" : 7
	},
	{
		"cor" : 0.52096,
		"source" : 5,
		"target" : 7
	},
	{
		"cor" : 0,
		"source" : 0,
		"target" : 8
	},
	{
		"cor" : 0.16532,
		"source" : 1,
		"target" : 8
	},
	{
		"cor" : 0.16182,
		"source" : 2,
		"target" : 8
	},
	{
		"cor" : 0.041092,
		"source" : 3,
		"target" : 8
	},
	{
		"cor" : 0.11061,
		"source" : 4,
		"target" : 8
	},
	{
		"cor" : 0.18652,
		"source" : 5,
		"target" : 8
	}
]};
  
// create force directed graph layout from json file
//d3.json(json, function(error,graph) {
     
 force
     .nodes(json.nodes)
     .links(json.links)
     .start();

// create link SVG elements and bind link data from json file
// link thickness is determined by correlation between nodes
// link becomes transparent when you hover over it
var link = svg.selectAll(".link")
     .data(json.links)
     .enter()
     .append("line")
     .attr("class", "link")
     .style("stroke-width", function(d) { return(5*(1+d.cor)^2); })
     .on('mouseover', function(d){
        return d3.select(this)
                  .style({stroke:'red'})
                  .style({opacity:'0.5'});
      })
     .on('mouseout', function(d){
       return d3.select(this)
                .style({stroke:'ddd'})
                .style({opacity:'1.0'});
      });


// create node SVG elements and bind node data from the json file
var node = svg.selectAll(".node")
     .data(json.nodes)
     .enter().append("g")
	 .attr("class", "node")
     .call(force.drag);

 // make nodes into circles and set radius, color
 // nodes become transparent when you hover over
 node.append("circle")
     .data(json.nodes)
     .attr("r",function(d){
       return d.size/15;
     })
     .style("fill",function(d){
       return color(d.group);
     })
     .style("opacity",0.8)
     .on('mouseover', function(d){
       d3.select(this).style({opacity:'1.0'})
         .transition()
         .duration(750)
         .attr("r",function(d){return d.size/10;});
       
       tooltip.transition().duration(100).style("opacity", .9);
       console.log(tooltip, d3.event.pageX, d3.event.pageY, this.offsetLeft, this.offsetTop);
       tooltip.html(d)
         .style("left", (d3.event.offsetX) + "px")
         .style("top", (d3.event.offsetY - 28) + "px")
         .text(d.group);
      })
     .on("mousemove", function(d){
       tooltip.html(d)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px")
         .text(d.group);    
     })
     .on('mouseout', function(d){
       d3.select(this).style({opacity:'0.8'})
         .transition()
         .duration(300)
         .attr("r",function(d){return d.size/15;});

     })
     .call(force.drag);  

 // link coordinates
force.on("tick",function(){
   link.attr("x1", function(d) { return d.source.x; })
       .attr("y1", function(d) { return d.source.y; })
       .attr("x2", function(d) { return d.target.x; })
       .attr("y2", function(d) { return d.target.y; });

 node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

 });

</script>