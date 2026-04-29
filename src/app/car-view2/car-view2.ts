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

  toggleSheet() {
    this.isOpen = !this.isOpen;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  // ✅ THIS METHOD MUST BE INSIDE THE CLASS
 fixMaterials() {
  const viewer = document.getElementById('carViewer') as any;

  setTimeout(() => {
    const model = viewer.model;
    if (!model) return;

    // 🚘 WINDSHIELD (fake glass but best possible without transmission)
    const windshield = model.materials[1];
    windshield.alphaMode = 'BLEND';
    windshield.setDoubleSided(true);
    windshield.pbrMetallicRoughness.setBaseColorFactor([0.6, 0.8, 1, 0.05]); // slight tint + transparency
    windshield.pbrMetallicRoughness.setRoughnessFactor(0.01);
    windshield.pbrMetallicRoughness.setMetallicFactor(0.1);

    // 💡 HEADLIGHT GLASS
    const headlightGlass = model.materials[9];
    headlightGlass.alphaMode = 'BLEND';
    headlightGlass.setDoubleSided(true);
    headlightGlass.pbrMetallicRoughness.setBaseColorFactor([0.8, 0.9, 1, 0.1]);
    headlightGlass.pbrMetallicRoughness.setRoughnessFactor(0.05);

    // 🔴 BRAKELIGHT
    const brakeLight = model.materials[23];
    brakeLight.setEmissiveFactor([1, 0, 0]);

    // ⚪ REVERSE LIGHT
    const reverseLight = model.materials[11];
    reverseLight.setEmissiveFactor([1, 1, 1]);

  }, 0);
}
debugShine() {
  const viewer = document.querySelector('model-viewer') as any;

  console.log("Model:", viewer?.model);
  console.log("Environment:", viewer?.getAttribute('environment-image'));
}
onLoad() {
  const viewer = document.querySelector('model-viewer') as any;

  console.log("Model loaded:", viewer?.model);
  console.log("Environment:", viewer?.environmentImage);
}
}