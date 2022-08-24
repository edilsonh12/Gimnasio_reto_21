import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasRecepcionComponent } from './citas-recepcion.component';

describe('CitasRecepcionComponent', () => {
  let component: CitasRecepcionComponent;
  let fixture: ComponentFixture<CitasRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasRecepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
