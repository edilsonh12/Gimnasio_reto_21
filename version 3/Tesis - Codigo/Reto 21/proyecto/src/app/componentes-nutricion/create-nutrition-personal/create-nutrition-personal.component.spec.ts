import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNutritionPersonalComponent } from './create-nutrition-personal.component';

describe('CreateNutritionPersonalComponent', () => {
  let component: CreateNutritionPersonalComponent;
  let fixture: ComponentFixture<CreateNutritionPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNutritionPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNutritionPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
