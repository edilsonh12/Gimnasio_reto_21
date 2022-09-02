import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosPersonalComponent } from './documentos-personal.component';

describe('DocumentosPersonalComponent', () => {
  let component: DocumentosPersonalComponent;
  let fixture: ComponentFixture<DocumentosPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
