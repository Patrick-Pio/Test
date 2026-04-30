import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-view2',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-view2.html',
  styleUrls: ['./car-view2.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarViewComponent2 implements OnInit {
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
        car: 'MCL39 F1'
      }
    });
  }

  bookTestDrive() {
    this.router.navigate(['/book1'], {
      queryParams: {
        car: 'MCL39 F1',
        type: 'test-drive'
      }
    });
  }

  fixMaterials() {
    const viewer: any = document.getElementById('carViewer');
    setTimeout(() => {
      const model = viewer?.model;
      if (!model) return;
      model.materials.forEach((mat: any) => {
        const name = mat.name?.toLowerCase() || '';
        if (name.includes('glass') || name.includes('window')) {
          mat.alphaMode = 'BLEND';
          mat.setDoubleSided(true);
          mat.pbrMetallicRoughness.setBaseColorFactor([0.7, 0.8, 1, 0.1]);
          mat.pbrMetallicRoughness.setRoughnessFactor(0.05);
        }
      });
    }, 0);
  }

  debugShine() {
    const viewer = document.querySelector('model-viewer') as any;
    console.log('Model:', viewer?.model);
    console.log('Environment:', viewer?.getAttribute('environment-image'));
  }

  onLoad() {
    const viewer = document.querySelector('model-viewer') as any;
    console.log('Model loaded:', viewer?.model);
    console.log('Environment:', viewer?.environmentImage);
  }
}