import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingClientComponent } from './feeding-client.component';

describe('FeedingClientComponent', () => {
  let component: FeedingClientComponent;
  let fixture: ComponentFixture<FeedingClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedingClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
