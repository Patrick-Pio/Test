import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-view.html',
  styleUrls: ['./car-view.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarViewComponent1 implements OnInit {
   isOpen = false;

  toggleSheet() {
    this.isOpen = !this.isOpen;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  // ✅ THIS METHOD MUST BE INSIDE THE CLASS
  fixMaterials() {
    const viewer = document.querySelector('#carViewer') as any;
    const model = viewer?.model;

    if (!model) {
      console.log('Model not loaded yet');
      return;
    }

    model.materials.forEach((mat: any) => {
      const name = mat.name.toLowerCase();

      // Glass fix
      if (name.includes('glass') || name.includes('window')) {
        mat.pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 0.3]);
        mat.setAlphaMode('BLEND');
        mat.pbrMetallicRoughness.setRoughnessFactor(0.1);
      }

      // Taillight fix
      if (name.includes('light') || name.includes('tail')) {
        mat.pbrMetallicRoughness.setBaseColorFactor([1, 0, 0, 1]);
        mat.emissiveFactor = [1, 0, 0];
      }
    });
  }
}