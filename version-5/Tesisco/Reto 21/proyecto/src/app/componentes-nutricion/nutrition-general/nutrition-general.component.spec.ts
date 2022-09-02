import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionGeneralComponent } from './nutrition-general.component';

describe('NutritionGeneralComponent', () => {
  let component: NutritionGeneralComponent;
  let fixture: ComponentFixture<NutritionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
