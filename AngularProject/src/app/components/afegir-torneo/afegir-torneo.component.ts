import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnectingToBbddService } from '../../services/connecting-to-bbdd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afegir-torneo',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './afegir-torneo.component.html',
  styleUrl: './afegir-torneo.component.css'
})
export class AfegirTorneoComponent {
  value: string="";
  message: string="";
  torneo: string = '';
  description: string = '';
  addtorneo: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private connectBBDD: ConnectingToBbddService) {
    this.addtorneo = this.fb.group({
      torneo: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addtorneo.valid) {
      this.torneo = this.addtorneo.value.torneo;
      this.description = this.addtorneo.value.description;
      this.connectBBDD.crear_torneo(this.addtorneo.value).subscribe({
        next: (response) => {
          this.message = "Credencials incorrectes";
          window.location.reload();
        },
        error: (error) => {
          this.message = "Problemes amb el servidor";
        },
        complete: () => console.info("Tasca completada")
      });
    }
  }
}
