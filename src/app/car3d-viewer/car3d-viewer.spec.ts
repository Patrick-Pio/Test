import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Car3dViewer } from './car3d-viewer';

describe('Car3dViewer', () => {
  let component: Car3dViewer;
  let fixture: ComponentFixture<Car3dViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Car3dViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(Car3dViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
