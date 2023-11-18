import * as d3 from 'd3';
import Point from '../../models/Point';
import Line from '../../models/Line';
import { Ref } from 'vue';

export default function renderDiagram(width: number = 100, height: number = 100, pointsArray: Point[], linesArray: Line[], nodeSelector: string) {

    if(!nodeSelector)
        return console.error('renderDiagram: nodeSelector is not provided');

    // Initialize SVG container
    const d3Select = d3.select(nodeSelector).html('');

    const svg = d3Select.append('svg')
        .attr('overflow', 'visible')
        .attr('width', width)
        .attr('height', height)
        // .attr("stroke-dasharray", "5,5");

    linesArray.forEach(line => {
        svg.append('line')
        .attr('x1', line.posX[0]/100*width)
        .attr('y1', line.posY[0]/100*height)
        .attr('x2', line.posX[1]/100*width)
        .attr('y2', line.posY[1]/100*height)
        .attr("z-index", 2)
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
    });

    // Create scale Y
    let scaleY = d3.scaleLinear()
        .domain([100, 0])
        .range([0, height]);

    let y_axis = d3.axisLeft(scaleY);
    svg.append("g")
        .attr("transform", `translate(0, 0)`)
        .call(y_axis);

    // Add scales to axis X
    let scaleX = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    let x_axis = d3.axisBottom(scaleX);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(x_axis);

    // Render points
    pointsArray.forEach(point => {
        let cycle = svg.append('circle')
            .attr('cx', +(point.x/100*width))
            .attr('cy', +(point.y/100*height))
            .attr('r', 4)
            .attr("z-index", 10)
            .attr('fill', 'red');
        
        if(point.isEntryPoint) { cycle.attr('fill', 'green'); }

        // Added Label
        svg.append("text")
            .attr("x", function(d) { return point.x/100*width - 12; })
            .attr("y", function(d) { return point.y/100*height - 12; })
            .attr("fill", "white")
            .attr("z-index", 11)
            .text(function(d) { return point.name; });
    });
}