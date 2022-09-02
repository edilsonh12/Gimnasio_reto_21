import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRoutinePersonalComponent } from './record-routine-personal.component';

describe('RecordRoutinePersonalComponent', () => {
  let component: RecordRoutinePersonalComponent;
  let fixture: ComponentFixture<RecordRoutinePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordRoutinePersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRoutinePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
