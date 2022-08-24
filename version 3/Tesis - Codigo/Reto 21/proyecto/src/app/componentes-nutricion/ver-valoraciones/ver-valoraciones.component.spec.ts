import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerValoracionesComponent } from './ver-valoraciones.component';

describe('VerValoracionesComponent', () => {
  let component: VerValoracionesComponent;
  let fixture: ComponentFixture<VerValoracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerValoracionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerValoracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
