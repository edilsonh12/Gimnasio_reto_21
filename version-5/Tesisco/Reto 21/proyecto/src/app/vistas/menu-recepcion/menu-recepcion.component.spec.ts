import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRecepcionComponent } from './menu-recepcion.component';

describe('MenuRecepcionComponent', () => {
  let component: MenuRecepcionComponent;
  let fixture: ComponentFixture<MenuRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRecepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
