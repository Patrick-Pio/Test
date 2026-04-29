import { Routes } from '@angular/router';
import { ShowroomComponent } from './showroom/showroom';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { CarViewComponent1 } from './car-view/car-view';
import { CarViewComponent2 } from './car-view2/car-view2';
import { Book1 } from './book1/book1';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'showroom', component: ShowroomComponent },
  { path: 'car/:name', component: CarViewComponent1 },
  { path: 'car-view1', component: CarViewComponent1 },
  { path: 'car-view2', component: CarViewComponent2 },
  { path: 'book1', component: Book1}, 
  {path: 'my-bookings',loadComponent: () => import('./my-bookings/my-bookings').then(m => m.MyBookingsComponent)}
];