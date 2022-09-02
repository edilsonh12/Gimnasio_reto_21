import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinesPersonalComponent } from './routines-personal.component';

describe('RoutinesPersonalComponent', () => {
  let component: RoutinesPersonalComponent;
  let fixture: ComponentFixture<RoutinesPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutinesPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutinesPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
