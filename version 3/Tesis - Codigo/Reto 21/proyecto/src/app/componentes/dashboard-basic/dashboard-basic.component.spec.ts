import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBasicComponent } from './dashboard-basic.component';

describe('DashboardBasicComponent', () => {
  let component: DashboardBasicComponent;
  let fixture: ComponentFixture<DashboardBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
