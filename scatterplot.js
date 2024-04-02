// **** Functions to call for scaled values ****

function scaleYear(year) {
    return yearScale(year);
}

function scaleHomeruns(homeruns) {
    return hrScale(homeruns);
}

// **** Code for creating scales, axes and labels ****

var yearScale = d3.scaleLinear()
    .domain([1870,2017]).range([60,700]);

var hrScale = d3.scaleLinear()
    .domain([0,75]).range([340,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}));

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(hrScale));
    
// **** Your JavaScript code goes here ****


d3.csv("./baseball_hr_leaders.csv").then(function (data) {

    //  axis labels and graph title
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", 360)
        .attr("y", 390)
        .text("MLB Season");

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("x", -200)
        .attr("y", 10)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Home Runs (HR)");

    svg.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 360)
        .attr("y", 20)
        .text("Top 10 HR Leaders per MLB Season");


svg.selectAll("g.player")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "player")
    .attr("transform", function(d) {
        return "translate(" + scaleYear(+d.year) + "," + scaleHomeruns(+d.homeruns) + ")";
    })
    .each(function(d) { 
        d3.select(this).append("circle")
            .attr("r", 2) 
            .attr("class", function(d) {
                if (+d.rank >= 1 && +d.rank <= 3) {
                    return "circle-top-ranked";
                } else if (+d.rank >= 9 && +d.rank <= 10) {
                    return "circle-bottom-ranked";
                } else {
                    return "";
                }
            });
            
        d3.select(this)
        .append("text")
        .text(function(d) { return d.name; }) 
        .attr("dy", "-0.5em") 
        .attr("text-anchor", "middle"); 
    
    });
   
});