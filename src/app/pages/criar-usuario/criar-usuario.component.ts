import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private httpClient: HttpClient
  ) {}

  form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required]),
    tipoPerfil : new FormControl('', [Validators.required])
  },
  
  );

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.httpClient.post(environment.apiVibetex + "/criar", this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = `Parabéns ${data.nome}, sua conta foi criada com sucesso.`;
          this.form.reset();
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        }
      })
  }

  

}
