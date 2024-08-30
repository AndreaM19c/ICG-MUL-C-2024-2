const readline = require('readline');

// Configurar la interfaz readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Clase para manejar coordenadas cartesianas
class Cartesiana {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  coordenadas() {
    console.log(`Las coordenadas cartesianas son: (${this.x}, ${this.y})`);
  }

  aPolares() {
    const radio = Math.sqrt(this.x ** 2 + this.y ** 2);
    const angulo = Math.atan2(this.y, this.x); // Ángulo en radianes
    return {
      radio: radio,
      angulo: angulo * (180 / Math.PI) // Convertir radianes a grados
    };
  }

  static ingresarDatos(rl) {
    rl.question('Introduce la coordenada x: ', (inputX) => {
      rl.question('Introduce la coordenada y: ', (inputY) => {
        const x = parseFloat(inputX);
        const y = parseFloat(inputY);

        if (isNaN(x) || isNaN(y)) {
          console.log('Ambas coordenadas deben ser números válidos.');
          rl.close();
          return;
        }

        const punto = new Cartesiana(x, y);
        punto.coordenadas();

        const polares = punto.aPolares();
        console.log(`En coordenadas polares: r = ${polares.radio.toFixed(2)}, θ = ${polares.angulo.toFixed(2)}°`);

        rl.question('Introduce el número de lados del polígono: ', (inputLados) => {
          const lados = parseInt(inputLados);

          if (isNaN(lados) || lados < 3) {
            console.log('El número de lados debe ser un entero mayor o igual a 3.');
            rl.close();
            return;
          }

          console.log(`Dibuja un polígono regular con ${lados} lados.`);
          // Aquí puedes incluir una función para dibujar el polígono en coordenadas cartesianas.
          // Por ahora solo lo imprimimos como ejemplo.
          console.log(`Ejemplo de figura con ${lados} lados:`);

          for (let i = 0; i < lados; i++) {
            const angulo = (2 * Math.PI / lados) * i;
            const xCoord = Math.cos(angulo);
            const yCoord = Math.sin(angulo);
            console.log(`Vértice ${i + 1}: (${xCoord.toFixed(2)}, ${yCoord.toFixed(2)})`);
          }

          rl.close();
        });
      });
    });
  }
}

// Clase para manejar coordenadas polares
class Polar {
  constructor(radio, anguloGrados) {
    this.radio = radio;
    this.angulo = anguloGrados * (Math.PI / 180); // Convertir grados a radianes
  }

  coordenadas() {
    console.log(`Las coordenadas polares son: (r = ${this.radio}, θ = ${this.angulo * (180 / Math.PI)}°)`);
  }

  aCartesiana() {
    const x = this.radio * Math.cos(this.angulo);
    const y = this.radio * Math.sin(this.angulo);
    return {
      x: x,
      y: y
    };
  }

  static ingresarDatos(rl) {
    rl.question('Introduce el radio: ', (inputR) => {
      rl.question('Introduce el ángulo en grados: ', (inputTheta) => {
        const radio = parseFloat(inputR);
        const anguloGrados = parseFloat(inputTheta);

        if (isNaN(radio) || isNaN(anguloGrados)) {
          console.log('El radio y el ángulo deben ser números válidos.');
          rl.close();
          return;
        }

        const punto = new Polar(radio, anguloGrados);
        punto.coordenadas();

        const cartesianas = punto.aCartesiana();
        console.log(`En coordenadas cartesianas: (${cartesianas.x.toFixed(2)}, ${cartesianas.y.toFixed(2)})`);

        rl.question('Introduce el número de lados del polígono: ', (inputLados) => {
          const lados = parseInt(inputLados);

          if (isNaN(lados) || lados < 3) {
            console.log('El número de lados debe ser un entero mayor o igual a 3.');
            rl.close();
            return;
          }

          console.log(`Dibuja un polígono regular con ${lados} lados.`);
          // Aquí puedes incluir una función para dibujar el polígono en coordenadas cartesianas.
          // Por ahora solo lo imprimimos como ejemplo.
          console.log(`Ejemplo de figura con ${lados} lados:`);

          for (let i = 0; i < lados; i++) {
            const angulo = (2 * Math.PI / lados) * i;
            const xCoord = radio * Math.cos(angulo);
            const yCoord = radio * Math.sin(angulo);
            console.log(`Vértice ${i + 1}: (${xCoord.toFixed(2)}, ${yCoord.toFixed(2)})`);
          }

          rl.close();
        });
      });
    });
  }
}

// Método para elegir el tipo de coordenadas
function seleccionarTipoDeCoordenadas() {
  console.log('Selecciona el tipo de coordenadas con las que deseas trabajar:');
  console.log('1. Coordenadas Cartesianas');
  console.log('2. Coordenadas Polares');

  rl.question('Ingresa el número correspondiente: ', (respuesta) => {
    if (respuesta === '1') {
      Cartesiana.ingresarDatos(rl);
    } else if (respuesta === '2') {
      Polar.ingresarDatos(rl);
    } else {
      console.log('Opción no válida. Por favor, elige 1 o 2.');
      rl.close();
    }
  });
}

// Ejecutar el programa
seleccionarTipoDeCoordenadas();
