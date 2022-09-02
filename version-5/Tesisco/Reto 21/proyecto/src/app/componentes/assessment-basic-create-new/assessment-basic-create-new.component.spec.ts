import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentBasicCreateNewComponent } from './assessment-basic-create-new.component';

describe('AssessmentBasicCreateNewComponent', () => {
  let component: AssessmentBasicCreateNewComponent;
  let fixture: ComponentFixture<AssessmentBasicCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentBasicCreateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentBasicCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
