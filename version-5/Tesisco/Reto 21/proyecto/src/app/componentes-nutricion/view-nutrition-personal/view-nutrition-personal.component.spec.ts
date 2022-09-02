import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNutritionPersonalComponent } from './view-nutrition-personal.component';

describe('ViewNutritionPersonalComponent', () => {
  let component: ViewNutritionPersonalComponent;
  let fixture: ComponentFixture<ViewNutritionPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNutritionPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNutritionPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
