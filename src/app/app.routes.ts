import { Routes } from '@angular/router';
import { ShowroomComponent } from './showroom/showroom';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { Book1 } from './book1/book1';
import { AddCarComponent } from './add-car/add-car';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'showroom', component: ShowroomComponent },
  {
    path: 'car/:name',
    loadComponent: () => import('./car-view/car-view').then(m => m.CarViewComponent)
  },
  { path: 'book1', component: Book1 },
  {
    path: 'my-bookings',
    loadComponent: () => import('./my-bookings/my-bookings').then(m => m.MyBookingsComponent)
  },
  {
    path: 'car3d-viewer',
    loadComponent: () => import('./car3d-viewer/car3d-viewer').then(m => m.Car3dViewerComponent)
  },
  {
    path: 'add-car',
    loadComponent: () => import('./add-car/add-car').then(m => m.AddCarComponent)
  }
];