function main() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    canvas.style.backgroundColor = "black";
    
    var ctx = canvas.getContext('2d');
}

function drawVector(v, color) {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    var ctx = canvas.getContext('2d');
    var centerX = canvas.width/2;
    var centerY = canvas.height/2;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(200 + (v.elements[0]*20), 200 - (v.elements[1]*20));
    ctx.strokeStyle = color;
    ctx.stroke();
}

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var v1x = parseFloat(document.getElementById('v1x').value);
    var v1y = parseFloat(document.getElementById('v1y').value);
    var v2x = parseFloat(document.getElementById('v2x').value);
    var v2y = parseFloat(document.getElementById('v2y').value);

    const v1 = new Vector3([v1x, v1y, 0]);
    const v2 = new Vector3([v2x, v2y, 0]);

    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    // Set up canvas env
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Read values
    var v1x = parseFloat(document.getElementById('v1x').value);
    var v1y = parseFloat(document.getElementById('v1y').value);
    var v2x = parseFloat(document.getElementById('v2x').value);
    var v2y = parseFloat(document.getElementById('v2y').value);

    // Draw vectors
    const v1 = new Vector3([v1x, v1y, 0]);
    const v2 = new Vector3([v2x, v2y, 0]);

    drawVector(v1, "red");
    drawVector(v2, "blue");

    var operation = document.getElementById('op-select').value;
    var v3, v4;
    
    // Addition
    if (operation == "add") {
        v3 = v1.add(v2);
        drawVector(v3, "green");
    }
    // Subtraction
    else if (operation == "sub") {
        v3 = v1.sub(v2);
        drawVector(v3, "green");
    }

    // Multiplication
    else if (operation == "mul") {
        var scalar = parseFloat(document.getElementById('scalar').value);
        v3 = v1.mul(scalar); 
        v4 = v2.mul(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    }

    // Division
    else if (operation == "div") {
        var scalar = parseFloat(document.getElementById('scalar').value);
        if (scalar == 0) {
            throw new Error("Cannot divide by zero");
        }
        v3 = v1.div(scalar); 
        v4 = v2.div(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    }

    // Magnitude
    // Source: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    else if (operation == "mag") {
        var m1 = v1.magnitude();
        var m2 = v2.magnitude();
        console.log(`Magnitude v1: ${m1}`);
        console.log(`Magnitude v2: ${m2}`);
    }

    // Normalize 
    else if (operation == "norm") {
        v3 = v1.normalize(); 
        v4 = v2.normalize();
        drawVector(v3, "green");
        drawVector(v4, "green");
    } 
    
    // Angle Between
    else if (operation == "angle") {
        angleBetween(v1, v2);
    }

    // Area 
    else if (operation === "area") {
        areaTriangle(v1, v2);
    } 
}
// Angle Between 
// Source: https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians
function angleBetween(v1, v2) {
    let dot = Vector3.dot(v1, v2);
    let mag1 = v1.magnitude();
    let mag2 = v2.magnitude();
    if ((mag1 !== 0) || (mag2 !== 0)) {
        let angle = dot / (mag1 * mag2);
        angle = Math.acos(angle);
        angle = angle * (180/Math.PI);
        console.log(`Angle: ${angle}`);
    }
    else {
        throw new Error("Cannot divide by zero");
    }
}

// Area 
function areaTriangle(v1, v2) {
    let crossProduct = Vector3.cross(v1, v2);
    let area = crossProduct.magnitude()/2;
    console.log(`Area: ${area}`);
}