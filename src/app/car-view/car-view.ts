import { Component, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
export class CarViewComponent1 implements OnInit, AfterViewInit {
  isOpen = false;

  toggleSheet() {
    this.isOpen = !this.isOpen;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Attach native DOM listener to bypass model-viewer Shadow DOM event blocking
    const btn = document.querySelector('.test-drive-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        this.router.navigate(['/book1']);
      });
    }
  }

  bookTestDrive(): void {
    this.router.navigate(['/book1']);
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