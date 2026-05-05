import { Routes } from '@angular/router';
import { ShowroomComponent } from './showroom/showroom';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { Book1 } from './book1/book1';
<<<<<<< HEAD
=======
import { CarViewComponent3 } from './car-view3/car-view3';
import { AddCarComponent } from './add-car/add-car';
>>>>>>> 47bcf1211f1fe32cf6a48c6705e7b6ae6e8d992c

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'showroom', component: ShowroomComponent },
<<<<<<< HEAD
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
=======
  { path: 'car/:name', component: CarViewComponent },
  { path: 'car-view1', component: CarViewComponent },
  { path: 'car-view2', component: CarViewComponent2 },
  { path: 'car-view3', component: CarViewComponent3 },
  { path: 'book1', component: Book1 },
  { path: 'add-car', component: AddCarComponent },
  {
    path: 'my-bookings',
    loadComponent: () =>
      import('./my-bookings/my-bookings').then(m => m.MyBookingsComponent)
  },
  {
    path: 'car3d-viewer',
    loadComponent: () =>
      import('./car3d-viewer/car3d-viewer').then(m => m.Car3dViewerComponent)
>>>>>>> 47bcf1211f1fe32cf6a48c6705e7b6ae6e8d992c
  }
];