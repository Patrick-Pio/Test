import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarView2 } from './car-view2';

describe('CarView2', () => {
  let component: CarView2;
  let fixture: ComponentFixture<CarView2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarView2],
    }).compileComponents();

    fixture = TestBed.createComponent(CarView2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
