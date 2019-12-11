import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecruiterComponent } from './dashboard-recruiter.component';

describe('DashboardRecruiterComponent', () => {
  let component: DashboardRecruiterComponent;
  let fixture: ComponentFixture<DashboardRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
