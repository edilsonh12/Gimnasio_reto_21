import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssissmentClientComponent } from './assissment-client.component';

describe('AssissmentClientComponent', () => {
  let component: AssissmentClientComponent;
  let fixture: ComponentFixture<AssissmentClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssissmentClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssissmentClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
