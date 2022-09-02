import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentAdvancedComponent } from './assessment-advanced.component';

describe('AssessmentAdvancedComponent', () => {
  let component: AssessmentAdvancedComponent;
  let fixture: ComponentFixture<AssessmentAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentAdvancedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
