import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentAdvancedCreateNewComponent } from './assessment-advanced-create-new.component';

describe('AssessmentAdvancedCreateNewComponent', () => {
  let component: AssessmentAdvancedCreateNewComponent;
  let fixture: ComponentFixture<AssessmentAdvancedCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentAdvancedCreateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentAdvancedCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
