import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionPersonalUpdateComponent } from './nutrition-personal-update.component';

describe('NutritionPersonalUpdateComponent', () => {
  let component: NutritionPersonalUpdateComponent;
  let fixture: ComponentFixture<NutritionPersonalUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionPersonalUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionPersonalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
