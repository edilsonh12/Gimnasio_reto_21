import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionGeneralUpdateComponent } from './nutrition-general-update.component';

describe('NutritionGeneralUpdateComponent', () => {
  let component: NutritionGeneralUpdateComponent;
  let fixture: ComponentFixture<NutritionGeneralUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionGeneralUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionGeneralUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
