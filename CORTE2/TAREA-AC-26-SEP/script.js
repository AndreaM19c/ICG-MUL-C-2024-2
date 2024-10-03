class Figura {
    constructor(svg) {
        this.svg = svg;
        this.strokeStyle = 'black';
        this.lineWidth = 2;
    }
<script src="script.js"></script>



    setEstilo(strokeStyle, lineWidth) {
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }
}

class Punto {
    #x; // Atributo privado
    #y; // Atributo privado

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos de acceso
    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    // Método para establecer nuevos valores
    setPunto(x, y) {
        this.#x = x;
        this.#y = y;
    }
}

class Linea extends Figura {
    constructor(svg, punto1, punto2) {
        super(svg);
        this.punto1 = punto1;
        this.punto2 = punto2;
    }

    dibujar() {
        this.bresenham(
            this.punto1.getX(),
            this.punto1.getY(),
            this.punto2.getX(),
            this.punto2.getY()
        );
    }

    // Algoritmo de Bresenham
    bresenham(x1, y1, x2, y2) {
        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        let sx = (x1 < x2) ? 1 : -1;
        let sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.dibujarPixel(x1, y1); // Dibuja el punto actual

            if (x1 === x2 && y1 === y2) break;

            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }

    dibujarPixel(x, y) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', this.lineWidth);
        rect.setAttribute('height', this.lineWidth);
        rect.setAttribute('fill', this.strokeStyle);
        this.svg.appendChild(rect);
    }
}

class Circunferencia extends Figura {
    constructor(svg, centro, r) {
        super(svg);
        this.centro = centro; // Un objeto de tipo Punto
        this.r = r;
    }

    dibujar() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', this.centro.getX());
        circle.setAttribute('cy', this.centro.getY());
        circle.setAttribute('r', this.r);
        circle.setAttribute('stroke', this.strokeStyle);
        circle.setAttribute('stroke-width', this.lineWidth);
        circle.setAttribute('fill', 'none'); // Sin relleno
        this.svg.appendChild(circle);
    }
}

class Elipse extends Figura {
    constructor(svg, centro, a, b) {
        super(svg);
        this.centro = centro; // Un objeto de tipo Punto
        this.a = a;
        this.b = b;
    }

    dibujar() {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', this.centro.getX());
        ellipse.setAttribute('cy', this.centro.getY());
        ellipse.setAttribute('rx', this.a);
        ellipse.setAttribute('ry', this.b);
        ellipse.setAttribute('stroke', this.strokeStyle);
        ellipse.setAttribute('stroke-width', this.lineWidth);
        ellipse.setAttribute('fill', 'none'); // Sin relleno
        this.svg.appendChild(ellipse);
    }
}

// Inicializar el SVG
const svgCanvas = document.getElementById('svgCanvas');

// Crear puntos
const punto1 = new Punto(50, 50);
const punto2 = new Punto(200, 200);
const centroCircunferencia = new Punto(300, 100);
const centroElipse = new Punto(400, 300);

// Crear las figuras
const figuras = [
    new Linea(svgCanvas, punto1, punto2),
    new Circunferencia(svgCanvas, centroCircunferencia, 50),
    new Elipse(svgCanvas, centroElipse, 80, 50)
];

// Configurar estilo de dibujo y dibujar
figuras.forEach(figura => {
    figura.setEstilo('black', 2); // Estilo común para todas
    figura.dibujar();
});