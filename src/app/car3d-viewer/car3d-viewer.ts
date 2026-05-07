import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-car-3d-viewer',
  templateUrl: './car3d-viewer.html',
  styleUrls: ['./car3d-viewer.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Car3dViewerComponent implements AfterViewInit {

  @Input() model: string = 'assets/models/car1.glb';
  @Input() useAltFix: boolean = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const viewer = this.el.nativeElement.querySelector('model-viewer');
    if (!viewer) return;

    viewer.addEventListener('progress', (e: any) => {
      const bar = this.el.nativeElement.querySelector('#progress-bar');
      if (bar) {
        const pct = e.detail.totalProgress * 100;
        bar.style.width = pct + '%';
      }
    });
  }

  onLoad(event: any) {

  const bar = this.el.nativeElement.querySelector('#progress-bar');
  if (bar) bar.style.width = '100%';

  const viewer = event.target;
  const model = viewer?.model;

  if (!model) {
    console.log('Model not loaded yet');
    return;
  }

  console.log('Materials:', model.materials);

  model.materials.forEach((mat: any) => {

    const name = (mat.name || '').toLowerCase();
    const pbr = mat?.pbrMetallicRoughness;

    if (!pbr) return;

    try {

      // =========================
      // GLASS FIX
      // =========================
      if (
        name.includes('glass') ||
        name.includes('window') ||
        name.includes('windshield')
      ) {

        mat.setAlphaMode?.('BLEND');

        pbr.setMetallicFactor?.(0);

        pbr.setRoughnessFactor?.(0.05);

        pbr.setBaseColorFactor?.([0.85, 0.9, 1, 0.3]);
      }

      // =========================
      // ONLY FIX BROKEN WHITE MATERIALS
      // =========================

      const hasTexture =
        pbr.baseColorTexture ||
        pbr.metallicRoughnessTexture;

      if (!hasTexture) {

        const color = pbr.baseColorFactor;

        // detect pure white broken materials
        if (
          color &&
          color[0] > 0.95 &&
          color[1] > 0.95 &&
          color[2] > 0.95
        ) {

          pbr.setBaseColorFactor?.([0.7, 0.7, 0.7, 1]);

          pbr.setMetallicFactor?.(0.3);

          pbr.setRoughnessFactor?.(0.5);
        }
      }

    } catch (e) {
      console.log('Material fix error:', e);
    }
  });
}
}