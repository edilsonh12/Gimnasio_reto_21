import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRecepcionComponent } from './usuarios-recepcion.component';

describe('UsuariosRecepcionComponent', () => {
  let component: UsuariosRecepcionComponent;
  let fixture: ComponentFixture<UsuariosRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosRecepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
