import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistsUsersComponent } from './assists-users.component';

describe('AssistsUsersComponent', () => {
  let component: AssistsUsersComponent;
  let fixture: ComponentFixture<AssistsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistsUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
