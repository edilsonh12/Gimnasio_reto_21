import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeNutritionComponent } from './see-nutrition.component';

describe('SeeNutritionComponent', () => {
  let component: SeeNutritionComponent;
  let fixture: ComponentFixture<SeeNutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeNutritionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
