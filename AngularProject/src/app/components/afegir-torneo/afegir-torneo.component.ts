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
  addtorneo: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private connectBBDD: ConnectingToBbddService) {
    this.addtorneo = this.fb.group({
      torneo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addtorneo.valid) {
      this.connectBBDD.crear_torneo(this.addtorneo.value).subscribe({
        next: (response) => {
          this.value = JSON.stringify(response);
          console.log("JSON.stringify(response).accesToken: "+ response.accessToken)
          this.message = "Tournament added successful";
        },
        error: (e) => {
          console.log(e);
          if (e.status == 404) {
            this.message = "Credencials incorrectes";
          }
          else {
            this.message = "Problemes amb el servidor";
          }
        },
        complete: () => console.info("Tasca completada")
      });
    }
  }

}
