import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollRecepcionComponent } from './poll-recepcion.component';

describe('PollRecepcionComponent', () => {
  let component: PollRecepcionComponent;
  let fixture: ComponentFixture<PollRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollRecepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
