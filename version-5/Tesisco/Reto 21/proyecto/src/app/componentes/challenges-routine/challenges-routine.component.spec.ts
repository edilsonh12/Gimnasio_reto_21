import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesRoutineComponent } from './challenges-routine.component';

describe('ChallengesRoutineComponent', () => {
  let component: ChallengesRoutineComponent;
  let fixture: ComponentFixture<ChallengesRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengesRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
