import { Routes } from '@angular/router';
import { ShowroomComponent } from './showroom/showroom';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { CarViewComponent } from './car-view/car-view';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'showroom', component: ShowroomComponent },
  { path: 'car/:name', component: CarViewComponent }
];