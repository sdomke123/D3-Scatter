d3.csv("assets/data/data.csv").then(data => {
    data.forEach(d => {
        d.poverty = +d.poverty;
        d.age = +d.age;
        d.income = +d.income;
        d.healthcare = +d.healthcare;
        d.obesity = +d.obesity;
        d.smokes = +d.smokes;
    });
    
    const svgHeight = 500;
    const svgWidth = 950;
    const margins = {top: 20, right: 40, bottom: 60, left: 100};
    const svg = d3.select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)
        
    const chartGroup = svg.append("g")
        .attr("transform", `translate(${margins.left}, ${margins.top})`);

    const chartHeight = svgHeight - margins.top - margins.bottom;
    const chartWidth = svgWidth - margins.left - margins.right;
    
    const xScale = d3.scaleLinear()
        .domain([8, d3.max(data.map(d => d.poverty))])
        .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.healthcare))])
        .range([chartHeight, 0]);

    chartGroup.selectAll(".plotCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "plotCircle")
        .attr("r", 12)
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .style("fill", "#66a3ff");
    
    chartGroup.selectAll(".labels")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.healthcare))
        .text(d => {return d.abbr})
        .attr("text-anchor", "middle")
        .attr("dy", 4)
        .attr("font-size", 12)
        .style("fill", "white");

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
        .attr("class", "xaxis")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);
        
    chartGroup.append("g")
        .attr("class", "yaxis")
        .call(yAxis);
        
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth/2.5}, ${chartHeight + margins.top + 20})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");

    chartGroup.append("text")
        .attr("x", 0 - chartHeight/1.5)
        .attr("y", 0 - margins.left + 60)
        .attr("transform", "rotate(-90)")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");
});