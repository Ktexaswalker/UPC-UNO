import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent {
  @ViewChild('background') miElemento!: ElementRef;
  animacion:string = "animate__animated animate__flip animate__infinite infinite animate__slower";  // Inicialmente activa
  private stopScrollY = 800; // Altura en la que se detiene la animación
  private background!: HTMLElement;
  private intervalId!: number;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.checkScroll();
    this.cdr.detectChanges();
  }

  // Detectar el scroll de la ventana
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  // Verificar posición del scroll y actualizar ngClass
  checkScroll(): void {
    const scrollY = window.scrollY;
    // console.log(scrollY);
    if (scrollY >= this.stopScrollY) {
      this.animacion = "background-container";
    } else {
      this.animacion = "animate__animated animate__flip animate__infinite infinite animate__slower";
    }
  }
  
  ngOnInit(): void {
    this.background = document.getElementById('background') as HTMLElement;
    if (!this.background) return;
    this.createAnimatedElement();
    this.intervalId = window.setInterval(() => this.createAnimatedElement(), 3000);
  }

  private createAnimatedElement(): void {
    const number: number = Math.floor(Math.random() * 10);
    const choice: number = Math.floor(Math.random() * 4);
    const scale: number = window.innerWidth / window.innerWidth * 0.8;
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
    this.renderer.setStyle(mainContainer, 'position', 'absolute');
    this.renderer.setStyle(mainContainer, 'box-shadow', `${0.3 * scale}em ${0.3 * scale}em ${1 * scale}em ${color}`);
    this.renderer.setStyle(mainContainer, 'border-radius', `${2.5 * scale}rem`);
    this.renderer.setStyle(mainContainer, 'width', `${22 * scale}rem`);
    this.renderer.setStyle(mainContainer, 'height', `${31 * scale}rem`);
    this.renderer.setStyle(mainContainer, 'display', 'flex');
    this.renderer.setStyle(mainContainer, 'justify-content', 'center');
    this.renderer.setStyle(mainContainer, 'align-items', 'center');
    this.renderer.setStyle(mainContainer, 'background-color', 'white');
  
    // Crear el número en la esquina superior izquierda
    const topLeftNumber = this.renderer.createElement("b");
    topLeftNumber.textContent = number.toString();
    this.renderer.setStyle(topLeftNumber, 'position', 'absolute');
    this.renderer.setStyle(topLeftNumber, 'top', `${0 * scale}rem`);
    this.renderer.setStyle(topLeftNumber, 'left', `${1.7 * scale}rem`);
    this.renderer.setStyle(topLeftNumber, 'font-size', `${6 * scale}rem`);
    this.renderer.setStyle(topLeftNumber, 'color', 'white');

    // Crear el número en la esquina inferior derecha
    const bottomRightNumber = this.renderer.createElement("b");
    bottomRightNumber.textContent = number.toString();
    this.renderer.setStyle(bottomRightNumber, 'position', 'absolute');
    this.renderer.setStyle(bottomRightNumber, 'bottom', `${0 * scale}rem`);
    this.renderer.setStyle(bottomRightNumber, 'right', `${1.7 * scale}rem`);
    this.renderer.setStyle(bottomRightNumber, 'font-size', `${6 * scale}rem`);
    this.renderer.setStyle(bottomRightNumber, 'color', 'white');
    this.renderer.setStyle(bottomRightNumber, 'rotate', '180deg');

    // Crear el contenedor de color
    const colorContainer = this.renderer.createElement("div");
    this.renderer.setStyle(colorContainer, 'background-color', color);
    this.renderer.setStyle(colorContainer, 'width', `${20 * scale}rem`);
    this.renderer.setStyle(colorContainer, 'height', `${29 * scale}rem`);
    this.renderer.setStyle(colorContainer, 'display', 'flex');
    this.renderer.setStyle(colorContainer, 'justify-content', 'center');
    this.renderer.setStyle(colorContainer, 'align-items', 'center');
    this.renderer.setStyle(colorContainer, 'border-radius', `${2 * scale}rem`);

    // Crear el círculo blanco dentro del contenedor de color
    const whiteCircle = this.renderer.createElement("div");
    this.renderer.setStyle(whiteCircle, 'background-color', 'white');
    this.renderer.setStyle(whiteCircle, 'width', `${16 * scale}rem`);
    this.renderer.setStyle(whiteCircle, 'height', `${28 * scale}rem`);
    this.renderer.setStyle(whiteCircle, 'display', 'flex');
    this.renderer.setStyle(whiteCircle, 'justify-content', 'center');
    this.renderer.setStyle(whiteCircle, 'align-items', 'center');
    this.renderer.setStyle(whiteCircle, 'border-radius', '50%');
    this.renderer.setStyle(whiteCircle, 'rotate', '40deg');

    // Crear el número grande en el centro del círculo
    const centerNumber = this.renderer.createElement("b");
    centerNumber.textContent = number.toString();
    this.renderer.setStyle(centerNumber, 'font-size', `${18 * scale}rem`);
    this.renderer.setStyle(centerNumber, 'color', color);
    this.renderer.setStyle(centerNumber, 'rotate', '-40deg');

    // Ensamblar elementos
    this.renderer.appendChild(whiteCircle, centerNumber);
    this.renderer.appendChild(colorContainer, whiteCircle);
    this.renderer.appendChild(mainContainer, colorContainer);
    this.renderer.appendChild(mainContainer, topLeftNumber);
    this.renderer.appendChild(mainContainer, bottomRightNumber);

    this.renderer.appendChild(this.background, mainContainer);

    setTimeout(() => {
      this.renderer.removeChild(this.background, mainContainer);
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

}
