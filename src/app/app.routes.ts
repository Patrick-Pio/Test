import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];