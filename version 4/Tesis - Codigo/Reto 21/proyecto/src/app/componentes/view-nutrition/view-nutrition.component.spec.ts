import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNutritionComponent } from './view-nutrition.component';

describe('ViewNutritionComponent', () => {
  let component: ViewNutritionComponent;
  let fixture: ComponentFixture<ViewNutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNutritionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
