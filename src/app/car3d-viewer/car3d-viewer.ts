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

      // =========================
      // 🪟 GLASS FIX
      // =========================
      if (name.includes('glass') || name.includes('window')) {
        mat.setAlphaMode?.('BLEND');
        pbr.setMetallicFactor?.(0);
        pbr.setRoughnessFactor?.(0.05);
        pbr.setBaseColorFactor?.([0.7, 0.8, 1, 0.15]);
      }

      // =========================
      // 💥 UNIVERSAL FALLBACK FIX
      // =========================
      try {
        pbr.setMetallicFactor?.(0.2);
        pbr.setRoughnessFactor?.(0.6);

        if (!pbr.baseColorTexture) {
          pbr.setBaseColorFactor?.([0.8, 0.8, 0.8, 1]);
        }
      } catch (e) {
        console.log('Material fix error:', e);
      }
    });
  }
}