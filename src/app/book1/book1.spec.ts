import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Book1 } from './book1';

describe('Book1', () => {
  let component: Book1;
  let fixture: ComponentFixture<Book1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Book1],
    }).compileComponents();

    fixture = TestBed.createComponent(Book1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
