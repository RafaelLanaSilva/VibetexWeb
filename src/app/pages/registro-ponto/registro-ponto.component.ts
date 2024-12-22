import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-registro-ponto',
  imports:
  [
    CommonModule,    
  ],
  templateUrl: './registro-ponto.component.html',
  styleUrl: './registro-ponto.component.css'
})
export class RegistroPontoComponent {


mensagemSucesso: string = '';
mensagemErro: string = '';


usuarioId: number = parseInt(localStorage.getItem('usuarioId') || '0', 10);


constructor(
  private httpClient: HttpClient
){}


// Função para registrar ou atualizar o ponto
registrarPonto(acao: string) {
  const dataHora = new Date().toISOString();
 
  let url: string;


  // Definindo a URL com base na ação
  switch (acao) {
    case 'inicio-expediente':
      url = `${environment.apiVibetex}/api/usuarios/${this.usuarioId}/inicio-expediente`;
      break;
    case 'fim-expediente':
      url = `${environment.apiVibetex}/api/usuarios/${this.usuarioId}/fim-expediente`;
      break;
    case 'pausa':
      url = `${environment.apiVibetex}/api/usuarios/${this.usuarioId}/pausa`;
      break;
    case 'volta-da-pausa':
      url = `${environment.apiVibetex}/api/usuarios/${this.usuarioId}/volta-da-pausa`;
      break;
    default:
      this.mensagemErro = 'Ação inválida!';
      return;
  }


  // Enviar a requisição POST
  this.httpClient.post(url, { dataHora })
  .subscribe({
    next: (data: any) => {
      this.mensagemSucesso = `Ponto registrado com sucesso: ${acao}.`;
    },
    error: (e) => {
      console.error(e);
      this.mensagemErro = `Erro ao registrar o ponto (${acao}). Tente novamente.`;
    }
  });


  }
}
