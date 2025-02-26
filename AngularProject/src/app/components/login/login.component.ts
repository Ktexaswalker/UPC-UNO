import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnectingToBbddService } from '../../services/connecting-to-bbdd.service';
import { AutentificacioService } from '../../services/autentificacio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  contactForm: FormGroup;
  value: any;
  message: any;
  username: string =  '';
  userpass: string =  '';
  
  constructor(private router: Router, private fb: FormBuilder, private connectBBDD: ConnectingToBbddService, private autentificacioService: AutentificacioService) {
    this.contactForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(){
    if (localStorage.getItem('isAuthenticated') === 'true') {
      this.router.navigate(['/login']);
    }
  }
  
  onSubmit() {
    if (this.contactForm.valid) {
      this.connectBBDD.login(this.contactForm.value).subscribe({
        next: (response) => {
          this.value = JSON.stringify(response);
          console.log(this.value)
          this.message = "Login successful";
          this.autentificacioService.usuariAutentificat();
          localStorage.setItem('isAuthenticated', 'true');
          this.router.navigate(['/']);
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

