function drawRectangle(svg, x, y, width, height, isCentered=false) {
    // No styling here - this is handled by CSS later.
    const rect = document.createElementNS(svg.namespaceURI, 'rect')

    x = (isCentered ? x - (width/2) : x);
    y = (isCentered ? y - (height/2) : y);

    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    
    svg.appendChild(rect);

    return rect;
}

function drawCircle(svg, x, y, radius) {
    // No styling here - this is handled by CSS later.
    const circle = document.createElementNS(svg.namespaceURI, 'circle')

    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', radius);
    
    svg.appendChild(circle);

    return circle;
}

function drawPolygon(svg, numOfPoints, x, y, angle, radius) {
    const polygon = document.createElementNS(svg.namespaceURI, 'polygon');

    let points = "";
    
    for (let i=0; i < numOfPoints; i++) {
        let theta = 2*Math.PI / numOfPoints;
        let px = radius * Math.cos(theta*i) + x;
        let py = radius * Math.sin(theta*i) + y;

        points = points + px + "," + py + " ";
    }

    polygon.setAttribute('points', points);
    polygon.setAttribute('transform', `rotate(${angle}, ${x}, ${y})`);

    svg.appendChild(polygon);
    
    return polygon;
}

function drawLine(svg, x1, y1, x2, y2) {

    const line = document.createElementNS(svg.namespaceURI, 'line')

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    
    svg.appendChild(line);

    return line;
};

function drawConnectionRect(svg, x1, y1, x2, y2, pattern) {

    const height = 5;

    const line = document.createElementNS(svg.namespaceURI, 'rect');

    const dx = x2-x1;
    const dy = y2-y1;

    const distance = Math.sqrt(dx*dx + dy*dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    line.setAttribute('x', x1);
    line.setAttribute('y', y1-height/2);
    line.setAttribute('width', distance);
    line.setAttribute('height', height); //Will be overwritten by styles
    line.setAttribute('fill', `url(#${pattern})`);

    line.setAttribute('transform', `rotate(${angle}, ${x1}, ${y1})`);

    line.classList.add('quest-line');
    

    svg.appendChild(line);

    return line;
};

function drawConnectionLine(svg, x1, y1, x2, y2) {

    const g = document.createElementNS(svg.namespaceURI, 'g');


    const dashedLine = document.createElementNS(svg.namespaceURI, 'line');
    dashedLine.setAttribute('x1', x1);
    dashedLine.setAttribute('y1', y1);
    dashedLine.setAttribute('x2', x2);
    dashedLine.setAttribute('y2', y2);
    dashedLine.setAttribute('stroke-dasharray', '10,10');

    const solidLine = document.createElementNS(svg.namespaceURI, 'line');
    solidLine.setAttribute('x1', x1);
    solidLine.setAttribute('y1', y1);
    solidLine.setAttribute('x2', x2);
    solidLine.setAttribute('y2', y2);

    g.appendChild(solidLine);
    g.appendChild(dashedLine);

    g.className.baseVal = 'quest-connection-line';
    
    svg.appendChild(g);

    return g;
};

//let rect = drawRectangle(questArea, 20, 10, 40, 20);
//let poly = drawPolygon(questArea, 8, 100, 100, 22.5, 50);
//let circle = drawCircle(questArea, 150, 150, 20);
//let line = drawLine(questArea, 300, 300, 200, 0);

//rect.classList.add("quest");
//poly.classList.add("quest");
//circle.classList.add("quest");
//line.classList.add("svg-test-line");

//let questLine = drawConnectionLine(questArea, 0, 500, 500, 500);

//questLine.classList.add("quest-line-unlocked");

//let questLine2 = drawConnectionLine(questArea, 0, 500, 500, 0);
//questLine2.classList.add("quest-line-locked");


