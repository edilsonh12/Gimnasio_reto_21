import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNutricionComponent } from './menu-nutricion.component';

describe('MenuNutricionComponent', () => {
  let component: MenuNutricionComponent;
  let fixture: ComponentFixture<MenuNutricionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuNutricionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNutricionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
