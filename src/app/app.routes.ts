import { Routes } from '@angular/router';
import { ShowroomComponent } from './showroom/showroom';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { CarViewComponent } from './car-view/car-view';
import { CarViewComponent2 } from './car-view2/car-view2';
import { Book1 } from './book1/book1';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'showroom', component: ShowroomComponent },
  { path: 'car/:name', component: CarViewComponent },
  { path: 'car-view1', component: CarViewComponent},
  { path: 'car-view2', component: CarViewComponent2 },
  { path: 'book1', component: Book1}, 
  {path: 'my-bookings',loadComponent: () => import('./my-bookings/my-bookings').then(m => m.MyBookingsComponent)},
  {path: 'car3d-viewer', loadComponent: () => import('./car3d-viewer/car3d-viewer').then(m => m.Car3dViewerComponent)}
];