import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-car-3d-viewer',
  templateUrl: './car3d-viewer.html',
  styleUrls: ['./car3d-viewer.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Car3dViewerComponent {

  @Input() model: string = 'assets/models/car1.glb';
  @Input() useAltFix: boolean = false;

  private viewer: any;
onLoad(event: any) {
  this.viewer = event.target;

  if (this.useAltFix) {
    this.fixMaterials2();
  } else {
    this.fixMaterials();
  }
}

  fixMaterials() {
    const model = this.viewer?.model;
    if (!model) return;

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

  fixMaterials2() {
    const model = this.viewer?.model;
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
  }
}