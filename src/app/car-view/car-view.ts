import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-view.html',
  styleUrls: ['./car-view.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarViewComponent1 implements OnInit {
  isOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  toggleSheet() {
    this.isOpen = !this.isOpen;
  }

  goToBooking() {
    console.log('BUTTON CLICKED');
    this.router.navigate(['/book1'], {
      queryParams: {
        car: 'Ferrari 288 GTO'
      }
    });
  }

  bookTestDrive() {
    this.router.navigate(['/book1'], {
      queryParams: {
        car: 'Ferrari 288 GTO',
        type: 'test-drive'
      }
    });
  }

  fixMaterials() {
    const viewer = document.querySelector('#carViewer') as any;
    const model = viewer?.model;
    if (!model) {
      console.log('Model not loaded yet');
      return;
    }
    model.materials.forEach((mat: any) => {
      const name = mat.name.toLowerCase();
      if (name.includes('glass') || name.includes('window')) {
        mat.pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 0.3]);
        mat.setAlphaMode('BLEND');
        mat.pbrMetallicRoughness.setRoughnessFactor(0.1);
      }
      if (name.includes('light') || name.includes('tail')) {
        mat.pbrMetallicRoughness.setBaseColorFactor([1, 0, 0, 1]);
        mat.emissiveFactor = [1, 0, 0];
      }
    });
  }
}