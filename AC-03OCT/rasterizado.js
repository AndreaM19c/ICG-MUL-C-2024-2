// Clase Punto para encapsular coordenadas
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

// Configuración inicial
const numPoints = 7; // Número de puntos
const radius = 200; // Radio del círculo
const points = []; // Lista para guardar los puntos
const isConvex = Math.random() >= 0.5; // Determinar aleatoriamente si es convexa o cóncava

// Generar puntos aleatorios
function generateRandomPoints() {
    for (let i = 0; i < numPoints; i++) {
        const angle = Math.random() * 2 * Math.PI; // Ángulo aleatorio
        const r = radius * Math.sqrt(Math.random()); // Radio aleatorio
        const x = 300 + r * Math.cos(angle); // Centro en (300, 300)
        const y = 300 + r * Math.sin(angle);
        points.push(new Punto(x, y)); // Crear y agregar un nuevo punto
    }
    // Agregar punto cóncavo si es necesario
    if (!isConvex) {
        const concavePoint = new Punto(
            300 + radius * Math.cos(Math.PI / 3),
            300 + radius * Math.sin(Math.PI / 3)
        );
        points.push(concavePoint);
    }
}

// Ordenar los puntos en sentido antihorario
function sortPoints(points) {
    const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

    return points.sort((a, b) => {
        const angleA = Math.atan2(a.y - centerY, a.x - centerX);
        const angleB = Math.atan2(b.y - centerY, b.x - centerX);
        return angleA - angleB;
    });
}

// Dibuja la figura en un canvas y devuelve la imagen rasterizada
function drawShape(sortedPoints) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(sortedPoints[0].x, sortedPoints[0].y);

    // Dibujar la figura
    sortedPoints.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.closePath();
    ctx.strokeStyle = 'blue';
    ctx.stroke(); // Solo dibujar el contorno

    // Dibujar los puntos
    ctx.fillStyle = 'red';
    sortedPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });

    return canvas.toDataURL("image/png"); // Devolver la imagen rasterizada
}

// Inicializar y ejecutar el programa
function init() {
    generateRandomPoints(); // Generar puntos
    const sortedPoints = sortPoints(points); // Ordenar puntos
    const rasterizedImage = drawShape(sortedPoints); // Dibujar y rasterizar figura

    // Mostrar resultados
    document.getElementById('rasterizedImage').src = rasterizedImage;
    const resultText = isConvex ? "La figura es convexa." : "La figura es cóncava.";
    document.getElementById('result').innerText = resultText;
}

init(); // Iniciar el proceso
