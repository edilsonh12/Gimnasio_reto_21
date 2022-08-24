import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNutritionComponent } from './create-nutrition.component';

describe('CreateNutritionComponent', () => {
  let component: CreateNutritionComponent;
  let fixture: ComponentFixture<CreateNutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNutritionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
