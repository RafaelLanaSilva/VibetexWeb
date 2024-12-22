import { Routes } from '@angular/router';
import { LoginUsuarioComponent } from './pages/login-usuario/login-usuario.component';
import { CriarUsuarioComponent } from './pages/criar-usuario/criar-usuario.component';
import { RegistroPontoComponent } from './pages/registro-ponto/registro-ponto.component';
import { PainelControleComponent } from './pages/painel-controle/painel-controle.component';

export const routes: Routes = [

    {
        path: 'pages/login-usuario',
        component: LoginUsuarioComponent
    },
    {
        path: 'pages/criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        path: 'pages/registro-ponto',
        component: RegistroPontoComponent
    },
    {
        path: 'pages/painel-controle',
        component: PainelControleComponent
    },

];
