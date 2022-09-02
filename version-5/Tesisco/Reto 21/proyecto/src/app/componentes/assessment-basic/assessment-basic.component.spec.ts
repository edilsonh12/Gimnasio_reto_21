import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentBasicComponent } from './assessment-basic.component';

describe('AssessmentBasicComponent', () => {
  let component: AssessmentBasicComponent;
  let fixture: ComponentFixture<AssessmentBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
