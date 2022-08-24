import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentAdvancedUpdateComponent } from './assessment-advanced-update.component';

describe('AssessmentAdvancedUpdateComponent', () => {
  let component: AssessmentAdvancedUpdateComponent;
  let fixture: ComponentFixture<AssessmentAdvancedUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentAdvancedUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentAdvancedUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
