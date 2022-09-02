import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionClientComponent } from './nutrition-client.component';

describe('NutritionClientComponent', () => {
  let component: NutritionClientComponent;
  let fixture: ComponentFixture<NutritionClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
