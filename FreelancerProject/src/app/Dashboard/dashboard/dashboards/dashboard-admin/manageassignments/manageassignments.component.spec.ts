import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageassignmentsComponent } from './manageassignments.component';

describe('ManageassignmentsComponent', () => {
  let component: ManageassignmentsComponent;
  let fixture: ComponentFixture<ManageassignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageassignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageassignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
