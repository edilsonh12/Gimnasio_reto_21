import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRoutineComponent } from './record-routine.component';

describe('RecordRoutineComponent', () => {
  let component: RecordRoutineComponent;
  let fixture: ComponentFixture<RecordRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
