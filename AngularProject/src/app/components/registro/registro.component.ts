import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectingToBbddService } from '../../services/connecting-to-bbdd.service';
import { AutentificacioService } from '../../services/autentificacio.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

    contactForm: FormGroup;
    value: any;
    message: any;
    username: string =  '';
    userpass: string =  '';

  constructor(private router: Router, private fb: FormBuilder, private connectBBDD: ConnectingToBbddService, private autentifiacioService: AutentificacioService){
    this.contactForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });
  }

  ngOnInit(){
    // if (localStorage.getItem('isAuthenticated') === 'true') {
    //   this.router.navigate(['/']);
    // }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.connectBBDD.register(this.contactForm.value).subscribe({
        next: (response) => {
          this.value = JSON.stringify(response);
          console.log(this.value)
          this.message = "Registro successful";
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
