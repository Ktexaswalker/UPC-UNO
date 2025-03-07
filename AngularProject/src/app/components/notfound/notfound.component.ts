import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {
  private background!: HTMLElement;
  private intervalId!: number;
  private intervalUNO!: number;
  logo: string = "404";
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.background = document.getElementById('background') as HTMLElement;
    if (!this.background) return;
    
    this.intervalId = window.setInterval(() => this.createAnimatedElement(), 600);
    this.intervalUNO = window.setInterval(() => {
      this.logo = this.logo === '404' ? 'NOT' : 'FOUND';
    }, 2000);
  }

  private createAnimatedElement(): void {
    const number: number = Math.floor(Math.random() * 10);
    const choice: number = Math.floor(Math.random() * 4);
    const scale: number = (Math.random() * 0.4) + 0.1;

    let color: string;
    switch (choice) {
      case 0: color = "#dc2418"; break;  // Rojo
      case 1: color = "#009142"; break;  // Verde
      case 2: color = "#fff300"; break;  // Amarillo
      case 3: color = "#0092df"; break;  // Azul
      default: color = "#ffffff";
    }

    // Crear el div principal
    const mainContainer = this.renderer.createElement("div");
    this.renderer.setStyle(mainContainer, 'box-shadow', `${scale * 0.3}em ${scale * 0.3}em ${scale * 1}em ${color}`);
    this.renderer.setStyle(mainContainer, 'border-radius', `${scale * 2.5}rem`);
    this.renderer.setStyle(mainContainer, 'width', `${scale * 24}rem`);
    this.renderer.setStyle(mainContainer, 'height', `${scale * 34}rem`);
    this.renderer.setStyle(mainContainer, 'display', 'flex');
    this.renderer.setStyle(mainContainer, 'justify-content', 'center');
    this.renderer.setStyle(mainContainer, 'align-items', 'center');
    this.renderer.setStyle(mainContainer, 'background-color', 'white');
    this.renderer.setStyle(mainContainer, 'position', 'absolute');

    // Crear el número en la esquina superior izquierda
    const topLeftNumber = this.renderer.createElement("b");
    topLeftNumber.textContent = number.toString();
    this.renderer.setStyle(topLeftNumber, 'position', 'absolute');
    this.renderer.setStyle(topLeftNumber, 'top', `${scale * 1.5}rem`);
    this.renderer.setStyle(topLeftNumber, 'left', `${scale * 1.5}rem`);
    this.renderer.setStyle(topLeftNumber, 'font-size', `${scale * 4}rem`);
    this.renderer.setStyle(topLeftNumber, 'color', 'white');

    // Crear el número en la esquina inferior derecha
    const bottomRightNumber = this.renderer.createElement("b");
    bottomRightNumber.textContent = number.toString();
    this.renderer.setStyle(bottomRightNumber, 'position', 'absolute');
    this.renderer.setStyle(bottomRightNumber, 'bottom', `${scale * 1.5}rem`);
    this.renderer.setStyle(bottomRightNumber, 'right', `${scale * 1.5}rem`);
    this.renderer.setStyle(bottomRightNumber, 'font-size', `${scale * 4}rem`);
    this.renderer.setStyle(bottomRightNumber, 'color', 'white');
    this.renderer.setStyle(bottomRightNumber, 'rotate', '180deg');

    // Crear el contenedor de color
    const colorContainer = this.renderer.createElement("div");
    this.renderer.setStyle(colorContainer, 'background-color', color);
    this.renderer.setStyle(colorContainer, 'width', `${scale * 22}rem`);
    this.renderer.setStyle(colorContainer, 'height', `${scale * 32}rem`);
    this.renderer.setStyle(colorContainer, 'display', 'flex');
    this.renderer.setStyle(colorContainer, 'justify-content', 'center');
    this.renderer.setStyle(colorContainer, 'align-items', 'center');
    this.renderer.setStyle(colorContainer, 'border-radius', `${scale * 2}rem`);

    // Crear el círculo blanco dentro del contenedor de color
    const whiteCircle = this.renderer.createElement("div");
    this.renderer.setStyle(whiteCircle, 'background-color', 'white');
    this.renderer.setStyle(whiteCircle, 'width', `${scale * 18}rem`);
    this.renderer.setStyle(whiteCircle, 'height', `${scale * 28}rem`);
    this.renderer.setStyle(whiteCircle, 'display', 'flex');
    this.renderer.setStyle(whiteCircle, 'justify-content', 'center');
    this.renderer.setStyle(whiteCircle, 'align-items', 'center');
    this.renderer.setStyle(whiteCircle, 'border-radius', '50%');
    this.renderer.setStyle(whiteCircle, 'rotate', '40deg');

    // Crear el número grande en el centro del círculo
    const centerNumber = this.renderer.createElement("b");
    centerNumber.textContent = number.toString();
    this.renderer.setStyle(centerNumber, 'font-size', `${scale * 18}rem`);
    this.renderer.setStyle(centerNumber, 'color', color);
    this.renderer.setStyle(centerNumber, 'rotate', '-40deg');

    // Ensamblar elementos
    this.renderer.appendChild(whiteCircle, centerNumber);
    this.renderer.appendChild(colorContainer, whiteCircle);
    this.renderer.appendChild(mainContainer, colorContainer);
    this.renderer.appendChild(mainContainer, topLeftNumber);
    this.renderer.appendChild(mainContainer, bottomRightNumber);

    // Posicionar en pantalla
    this.renderer.setStyle(mainContainer, 'left', `${Math.random() * 70}vw`);
    this.renderer.setStyle(mainContainer, 'top', `${Math.random() * 70}vh`);

    this.renderer.appendChild(this.background, mainContainer);

    // Agregar animación de salida
    setTimeout(() => {
      this.renderer.setStyle(mainContainer, 'opacity', '0');
    }, 2000);

    setTimeout(() => {
      this.renderer.removeChild(this.background, mainContainer);
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    clearInterval(this.intervalUNO);
  }
}
