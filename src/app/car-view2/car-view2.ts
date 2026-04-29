import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-view2.html',
  styleUrls: ['./car-view2.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarViewComponent2 implements OnInit {

  isOpen = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  toggleSheet() {
    this.isOpen = !this.isOpen;
  }

  // ✅ FIXED MATERIAL HANDLING (SAFE FOR ANY MODEL)
  fixMaterials() {
    const viewer: any = document.getElementById('carViewer');

    setTimeout(() => {
      const model = viewer?.model;
      if (!model) return;

      model.materials.forEach((mat: any) => {

        const name = mat.name?.toLowerCase() || '';

        // 🪟 Glass / transparent parts
        if (name.includes('glass') || name.includes('window')) {
          mat.alphaMode = 'BLEND';
          mat.setDoubleSided(true);
          mat.pbrMetallicRoughness.setBaseColorFactor([0.7, 0.8, 1, 0.1]);
          mat.pbrMetallicRoughness.setRoughnessFactor(0.05);
        }

        // 💡 Lights
        if (name.includes('light') || name.includes('lamp')) {
          mat.setEmissiveFactor([1, 1, 1]);
        }

        // 🔴 Brake lights (if exist)
        if (name.includes('brake')) {
          mat.setEmissiveFactor([1, 0, 0]);
        }

      });

    }, 100);
  }
}