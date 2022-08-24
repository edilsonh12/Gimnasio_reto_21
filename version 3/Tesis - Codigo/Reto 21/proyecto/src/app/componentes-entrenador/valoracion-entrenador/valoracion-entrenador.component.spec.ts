import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionEntrenadorComponent } from './valoracion-entrenador.component';

describe('ValoracionEntrenadorComponent', () => {
  let component: ValoracionEntrenadorComponent;
  let fixture: ComponentFixture<ValoracionEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoracionEntrenadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoracionEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
