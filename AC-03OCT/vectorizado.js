class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

const numPoints = 7; // Número de puntos
const radius = 200; // Radio del círculo
const puntos = []; // Lista para almacenar los puntos
const isConvex = Math.random() >= 0.5; // Determinar si es convexa o cóncava

// Generar puntos aleatorios
function generateRandomPoints() {
    for (let i = 0; i < numPoints; i++) {
        const angle = Math.random() * 2 * Math.PI; // Ángulo aleatorio
        const r = radius * Math.sqrt(Math.random()); // Radio aleatorio
        const x = 300 + r * Math.cos(angle); // Centro en (300, 300)
        const y = 300 + r * Math.sin(angle);
        puntos.push(new Punto(x, y)); // Crear un nuevo punto y agregarlo a la lista
    }

    // Agregar un punto cóncavo si es necesario
    if (!isConvex) {
        const concavePoint = new Punto(
            300 + radius * Math.cos(Math.PI / 3), // Punto cóncavo
            300 + radius * Math.sin(Math.PI / 3)
        );
        puntos.push(concavePoint); // Agregar el punto cóncavo
    }
}

// Ordenar los puntos en sentido antihorario
function sortPoints(puntos) {
    const centerX = puntos.reduce((sum, p) => sum + p.x, 0) / puntos.length;
    const centerY = puntos.reduce((sum, p) => sum + p.y, 0) / puntos.length;

    return puntos.sort((a, b) => {
        const angleA = Math.atan2(a.y - centerY, a.x - centerX);
        const angleB = Math.atan2(b.y - centerY, b.x - centerX);
        return angleA - angleB;
    });
}

// Dibuja la figura en SVG sin relleno
function drawShape(sortedPoints) {
    const svg = document.getElementById('svgCanvas');
    svg.innerHTML = ''; // Limpiar el contenido anterior

    // Crear un elemento <path> para la figura
    let pathData = `M ${sortedPoints[0].x} ${sortedPoints[0].y} `;
    for (let i = 1; i < sortedPoints.length; i++) {
        pathData += `L ${sortedPoints[i].x} ${sortedPoints[i].y} `;
    }
    pathData += 'Z'; // Cerrar la figura

    // Agregar el contorno
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", "blue");
    path.setAttribute("fill", "none"); // Sin relleno
    path.setAttribute("stroke-width", "2");
    svg.appendChild(path);

    // Dibujar los puntos
    sortedPoints.forEach(point => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "red");
        svg.appendChild(circle);
    });
}

// Función principal
function main() {
    generateRandomPoints(); // Generar puntos
    const sortedPoints = sortPoints(puntos); // Ordenar los puntos
    drawShape(sortedPoints); // Dibujar la figura

    // Mostrar el resultado
    const resultText = isConvex ? "La figura es convexa." : "La figura es cóncava.";
    document.getElementById('result').innerText = resultText;
}

// Ejecutar la función principal
main();
