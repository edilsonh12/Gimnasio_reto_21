import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeQuotesComponent } from './see-quotes.component';

describe('SeeQuotesComponent', () => {
  let component: SeeQuotesComponent;
  let fixture: ComponentFixture<SeeQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
