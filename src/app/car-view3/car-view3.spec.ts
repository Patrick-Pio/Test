import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarView3 } from './car-view3';

describe('CarView3', () => {
  let component: CarView3;
  let fixture: ComponentFixture<CarView3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarView3],
    }).compileComponents();

    fixture = TestBed.createComponent(CarView3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
