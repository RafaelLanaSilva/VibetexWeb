import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-usuario',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {

  mensagemErro: string = '';

  constructor(
    private httpCliente: HttpClient
  ) {}

  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
   
    this.httpCliente.post(environment.apiVibetex + "/login", this.form.value)
      .subscribe({
        next: (data : any) => {       
          //redirecionar para a página de consulta de clientes
          location.href = '/pages/registro-ponto';
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        }
      })
  }

}
