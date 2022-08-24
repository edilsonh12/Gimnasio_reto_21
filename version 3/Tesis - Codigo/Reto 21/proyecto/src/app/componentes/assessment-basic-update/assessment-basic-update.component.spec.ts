import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentBasicUpdateComponent } from './assessment-basic-update.component';

describe('AssessmentBasicUpdateComponent', () => {
  let component: AssessmentBasicUpdateComponent;
  let fixture: ComponentFixture<AssessmentBasicUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentBasicUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentBasicUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
