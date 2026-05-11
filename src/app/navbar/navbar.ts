import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}