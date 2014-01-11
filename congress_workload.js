<!DOCTYPE html>
<html>
<meta charset="utf-8">
<style>


.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;  
}

.axis2 line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;    
}

path { 
    stroke: black;
    stroke-width: 1;
    fill: none;
}

.line {
  fill: none;
  stroke-width: 5px;
  opacity: 0.5;
}

.line:hover {
  opacity: 1;
}

.line2 {
  fill: none;
  stroke-width: 5px;
  opacity: 0.5;
}

.line2:hover {
  opacity: 1;
}

.bar {
  opacity: 0.7;
}

.bar:hover {
  opacity: 1 ;
}

.x.axis path {
  display: none
    stroke: #000;
}

.d3-tip {
  font-weight: bold;
  background: rgba(0, 0, 0, 0.8);
  padding: 12px;
  color: #fff; 
  z-index: 5070;
}
<body>
</style>
  
  <div class="filter_options">
    <input class="filter_button" id="button" type="checkbox"> Show CPI</input></div><br>

  <div id="test2"></div>

  <script type='text/javascript' src="/s/d3min.js"></script>
  <script type='text/javascript' src="/s/d3tip.js"></script>

<script>

var margin = {top: 40, right: 40, bottom: 30, left: 70},
    width = 710 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

var formatPercent = d3.format("f");

var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
          .range([height, 0]);

var y2 = d3.scale.linear().domain([0,6])
           .range([height,0]);

var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .tickFormat(formatPercent);

var yAxisRight = d3.svg.axis()
                   .scale(y2)
                   .orient("right");

var line = d3.svg.line()
.interpolate("basis")
             .x(function(d){ return x(d.congress); })
             .y(function(d){ return y2(d.appropriation);  });

var CPI = d3.svg.line()
.interpolate("basis")
             .x(function(d){ return x(d.congress); })
             .y(function(d){ return y2(d.CPIrel);  });      

var tip = d3.tip()
  .attr('class', 'd3-tip')
.style("visibility","visible")
  .offset([-20, 0])
  .html(function(d) {
    return "Bills Enacted: " + d.enact + "<br> <span style='color:lightskyblue'>Democrats: " + d.propDem + 
          "%</span><span style='color:red'><br>Republicans : " + d.propRep + "%</span" ;
  });

var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .html("Appropriations growth")

var tip3 = d3.tip()
  .attr('class', 'd3-tip')
  .html("Consumer Price Index growth");

var svg = d3.select("#test2").append("svg")
            .attr("width", width + margin.left + margin.right-10)
            .attr("height", height + margin.top + margin.bottom+15)
          .append("g")
            .attr("transform", "translate(" +(-10+ margin.left) + "," + margin.top + ")");

data=[{"congress":"80","enact":"906","senateDem":"47","senateRep":"53","appropriation":"1.01","houseDem":"43","houseRep":"57","CPI":"65.2","CPIgrowth":"0","Appgrowth":"0","CPIrel":"1.01","propDem":"45","propRep":"55"},
{"congress":"81","enact":"921","senateDem":"56","senateRep":"44","appropriation":"1.12","houseDem":"61","houseRep":"39","CPI":"72.6","CPIgrowth":"11","Appgrowth":"11","CPIrel":"1.12","propDem":"59","propRep":"42"},
{"congress":"82","enact":"594","senateDem":"51","senateRep":"49","appropriation":"1.2","houseDem":"54","houseRep":"46","CPI":"82.4","CPIgrowth":"26","Appgrowth":"19","CPIrel":"1.27","propDem":"53","propRep":"48"},
{"congress":"83","enact":"781","senateDem":"49","senateRep":"51","appropriation":"1.29","houseDem":"49","houseRep":"51","CPI":"90.9","CPIgrowth":"39","Appgrowth":"28","CPIrel":"1.4","propDem":"49","propRep":"51"},
{"congress":"84","enact":"1028","senateDem":"51","senateRep":"49","appropriation":"1.37","houseDem":"53","houseRep":"47","CPI":"96.5","CPIgrowth":"48","Appgrowth":"36","CPIrel":"1.49","propDem":"52","propRep":"48"},
{"congress":"85","enact":"936","senateDem":"51","senateRep":"49","appropriation":"1.47","houseDem":"54","houseRep":"46","CPI":"99.6","CPIgrowth":"53","Appgrowth":"46","CPIrel":"1.55","propDem":"53","propRep":"48"},
{"congress":"86","enact":"800","senateDem":"65","senateRep":"35","appropriation":"1.64","houseDem":"65","houseRep":"35","CPI":"103.9","CPIgrowth":"59","Appgrowth":"62","CPIrel":"1.61","propDem":"65","propRep":"35"},
{"congress":"87","enact":"885","senateDem":"64","senateRep":"36","appropriation":"1.6","houseDem":"60","houseRep":"40","CPI":"107.6","CPIgrowth":"65","Appgrowth":"58","CPIrel":"1.67","propDem":"62","propRep":"38"},
{"congress":"88","enact":"666","senateDem":"67","senateRep":"33","appropriation":"1.78","houseDem":"59","houseRep":"41","CPI":"109.6","CPIgrowth":"68","Appgrowth":"76","CPIrel":"1.7","propDem":"63","propRep":"37"},
{"congress":"89","enact":"810","senateDem":"68","senateRep":"32","appropriation":"1.64","houseDem":"68","houseRep":"32","CPI":"113.6","CPIgrowth":"74","Appgrowth":"62","CPIrel":"1.76","propDem":"68","propRep":"32"},
{"congress":"90","enact":"640","senateDem":"64","senateRep":"36","appropriation":"1.75","houseDem":"57","houseRep":"43","CPI":"118.3","CPIgrowth":"81","Appgrowth":"73","CPIrel":"1.83","propDem":"61","propRep":"40"},
{"congress":"91","enact":"695","senateDem":"58","senateRep":"42","appropriation":"1.8","houseDem":"56","houseRep":"44","CPI":"124","CPIgrowth":"90","Appgrowth":"78","CPIrel":"1.92","propDem":"57","propRep":"43"},
{"congress":"92","enact":"607","senateDem":"55","senateRep":"45","appropriation":"1.97","houseDem":"59","houseRep":"41","CPI":"130.7","CPIgrowth":"100","Appgrowth":"95","CPIrel":"2.02","propDem":"57","propRep":"43"},
{"congress":"93","enact":"649","senateDem":"57","senateRep":"43","appropriation":"2.16","houseDem":"56","houseRep":"44","CPI":"136.2","CPIgrowth":"109","Appgrowth":"114","CPIrel":"2.11","propDem":"57","propRep":"44"},
{"congress":"94","enact":"588","senateDem":"62","senateRep":"38","appropriation":"2.3","houseDem":"67","houseRep":"33","CPI":"140.3","CPIgrowth":"115","Appgrowth":"128","CPIrel":"2.17","propDem":"65","propRep":"36"},
{"congress":"95","enact":"634","senateDem":"62","senateRep":"38","appropriation":"2.3","houseDem":"67","houseRep":"33","CPI":"144.5","CPIgrowth":"122","Appgrowth":"128","CPIrel":"2.24","propDem":"65","propRep":"36"},
{"congress":"96","enact":"613","senateDem":"59","senateRep":"41","appropriation":"2.27","houseDem":"64","houseRep":"36","CPI":"148.2","CPIgrowth":"127","Appgrowth":"125","CPIrel":"2.29","propDem":"62","propRep":"39"},
{"congress":"97","enact":"473","senateDem":"46","senateRep":"54","appropriation":"2.39","houseDem":"56","houseRep":"44","CPI":"152.4","CPIgrowth":"134","Appgrowth":"137","CPIrel":"2.36","propDem":"51","propRep":"49"},
{"congress":"98","enact":"623","senateDem":"46","senateRep":"54","appropriation":"2.13","houseDem":"62","houseRep":"38","CPI":"156.9","CPIgrowth":"141","Appgrowth":"111","CPIrel":"2.43","propDem":"54","propRep":"46"},
{"congress":"99","enact":"664","senateDem":"47","senateRep":"53","appropriation":"2.17","houseDem":"58","houseRep":"42","CPI":"160.5","CPIgrowth":"146","Appgrowth":"115","CPIrel":"2.48","propDem":"53","propRep":"48"},
{"congress":"100","enact":"713","senateDem":"55","senateRep":"45","appropriation":"2.29","houseDem":"59","houseRep":"41","CPI":"163","CPIgrowth":"150","Appgrowth":"127","CPIrel":"2.53","propDem":"57","propRep":"43"},
{"congress":"101","enact":"650","senateDem":"55","senateRep":"45","appropriation":"2.58","houseDem":"60","houseRep":"40","CPI":"166.6","CPIgrowth":"156","Appgrowth":"155","CPIrel":"2.59","propDem":"58","propRep":"43"},
{"congress":"102","enact":"590","senateDem":"56","senateRep":"44","appropriation":"2.49","houseDem":"62","houseRep":"38","CPI":"172.2","CPIgrowth":"164","Appgrowth":"147","CPIrel":"2.67","propDem":"59","propRep":"41"},
{"congress":"103","enact":"465","senateDem":"57","senateRep":"43","appropriation":"2.73","houseDem":"59","houseRep":"41","CPI":"177.1","CPIgrowth":"172","Appgrowth":"170","CPIrel":"2.75","propDem":"58","propRep":"42"},
{"congress":"104","enact":"333","senateDem":"48","senateRep":"52","appropriation":"3.23","houseDem":"47","houseRep":"53","CPI":"179.9","CPIgrowth":"176","Appgrowth":"220","CPIrel":"2.79","propDem":"48","propRep":"53"},
{"congress":"105","enact":"394","senateDem":"45","senateRep":"55","appropriation":"3.46","houseDem":"48","houseRep":"52","CPI":"184","CPIgrowth":"182","Appgrowth":"243","CPIrel":"2.85","propDem":"47","propRep":"54"},
{"congress":"106","enact":"580","senateDem":"45","senateRep":"55","appropriation":"3.57","houseDem":"49","houseRep":"51","CPI":"189","CPIgrowth":"190","Appgrowth":"253","CPIrel":"2.93","propDem":"47","propRep":"53"},
{"congress":"107","enact":"377","senateDem":"50","senateRep":"50","appropriation":"3.64","houseDem":"49","houseRep":"51","CPI":"195.3","CPIgrowth":"200","Appgrowth":"260","CPIrel":"3.03","propDem":"50","propRep":"51"},
{"congress":"108","enact":"498","senateDem":"48","senateRep":"52","appropriation":"3.77","houseDem":"47","houseRep":"53","CPI":"201.6","CPIgrowth":"209","Appgrowth":"273","CPIrel":"3.12","propDem":"48","propRep":"53"},
{"congress":"109","enact":"482","senateDem":"44","senateRep":"56","appropriation":"3.85","houseDem":"47","houseRep":"53","CPI":"207.3","CPIgrowth":"218","Appgrowth":"281","CPIrel":"3.21","propDem":"46","propRep":"55"},
{"congress":"110","enact":"460","senateDem":"50","senateRep":"50","appropriation":"3.97","houseDem":"54","houseRep":"46","CPI":"215.3","CPIgrowth":"230","Appgrowth":"293","CPIrel":"3.33","propDem":"52","propRep":"48"},
{"congress":"111","enact":"383","senateDem":"58","senateRep":"42","appropriation":"4.4","houseDem":"59","houseRep":"41","CPI":"214.5","CPIgrowth":"229","Appgrowth":"336","CPIrel":"3.32","propDem":"59","propRep":"42"},
{"congress":"112","enact":"283","senateDem":"52","senateRep":"48","appropriation":"4.66","houseDem":"44","houseRep":"56","CPI":"218.1","CPIgrowth":"235","Appgrowth":"361","CPIrel":"3.38","propDem":"48","propRep":"52"},
{"congress":"113","enact":"116","senateDem":"55","senateRep":"45","appropriation":"4.54","houseDem":"46","houseRep":"54","CPI":"224.9","CPIgrowth":"245","Appgrowth":"350","CPIrel":"3.48","propDem":"51","propRep":"50"}]
  x.domain(data.map(function(d) { return d.congress; }));
  y.domain([0, d3.max(data, function(d) { return d.enact; })]);


  svg.append("g")
      .attr("class", "x axis")
 	  .style("font-size","0.7em")
      .style("font-family","sans-serif")      
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
   		.selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });
  
  svg.append("text")      
        .attr("x", width / 2 )
        .attr("y",  height + margin.bottom + 10)
        .style("text-anchor", "middle")  
  	  .style("font-size","0.8em")
      .style("font-family","sans-serif")   
        .text("Congress");

  svg.append("g")
      .attr("class", "y axis")
  	  .style("font-size","0.7em")
      .style("font-family","sans-serif")      
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 3)
      .attr("dy", ".71em")
	  .style("font-size","0.8em")
      .style("font-family","sans-serif")      
      .style("text-anchor", "end")
      .text("# Bills Enacted");

 svg.append("text")
      .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("font-weight", "bold")
        .style("font-family", "sans-serif")
        .text("Congressional Workload");
  
    svg.append("g")
      .attr("class", "y axis2")
      .style("font-size","0.7em")
      .style("font-family","sans-serif")
      .attr("transform", "translate(" + (width) + ",0)")
      .call(yAxisRight)
    .append("text")
      .attr("transform", "rotate(-90)")
      .style("font-size","0.8em")
      .style("font-family","sans-serif")      
      .attr("y", -10)
      .attr("dy", ".1em")
      .style("text-anchor", "end")
      .text("$ Million Appropriations");;

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.congress); })
      .attr("fill",function(d) { 
            var diff = d.propDem - d.propRep;
            switch (true)
            {
             case  (diff > 0):
                return "Blue";
                break;
             case  (diff < 0):
                return "Red";
                break;
            }
          })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.enact); })
      .attr("height", function(d) { return height - 2 - y(d.enact); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
  
  
svg.call(tip);
svg.call(tip2);
svg.call(tip3);

  svg.append("path")
      .datum(data)
      .attr("class","line")
      .style("stroke", "grey")
      .attr("d",line)
      .on('mouseover', tip2.show)
      .on("mousemove", function(){return tip2.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
      .on('mouseout', tip2.hide);

  svg.append("path")
      .datum(data)
      .attr("class","line2")
      .style("stroke", "black")
      .style("stroke-dasharray", 10)
      .attr("display","none")
      .attr("d",CPI)
      .on('mouseover',tip3.show)
      .on("mousemove", function(){ return tip3.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
      .on('mouseout', tip3.hide);

// display CPI line when checkbox clicked
  d3.selectAll(".filter_button").on("change", function() {
    display = this.checked ? "inline" : "none";

    svg.selectAll(".line2")
    .attr("display", display);
  });

</script>
</html>