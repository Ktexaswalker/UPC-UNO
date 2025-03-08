import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConnectingToBbddService } from '../../services/connecting-to-bbdd.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-torneo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-torneo.component.html',
  styleUrl: './add-torneo.component.css'
})
export class AddTorneoComponent  {

  @Input() torneo_name: string = '';

  formulari: FormGroup = new FormGroup({});
  torneo_obj: any;
  torneo: string = '';
  description: string = '';


  constructor(private conectarBD: ConnectingToBbddService, private formB: FormBuilder, private router : Router ){

  }

  ngOnInit(): void {
    console.log("AQUI EL TORNEO_NAME: "+this.torneo_name);
    this.getTorneoServei(this.torneo_name);

    this.formulari = this.formB.group({
      torneo: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  getTorneoServei(torneo: string) {
    this.conectarBD.findTorneobyName(torneo).subscribe({
      next: (response) => {
        console.log(response);
        this.torneo_obj = response.torneo_obj;
        this.ferform();
      },
      error: (error) => {
        console.error('Error al trobar el torneo:', error);
      },
      complete: () =>  console.info('Torneo trobat correcament')

    });

  }

  ferform(){
    this.formulari.setValue({
      torneo: this.torneo_obj.torneo,
      description: this.torneo_obj.description
    });
  }

  onSubmit() {
    if (this.formulari.valid) {
      this.torneo = this.formulari.value.torneo;
      this.description = this.formulari.value.description;
      this.conectarBD.actualitzar_torneo(this.torneo, this.description).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Error al actualitzar el torneo:', error);
        },
        complete: () => this.router.navigate(['/torneos']) 
      });
    }
  }
}
