import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseAssignmentComponent } from './browse-assignment.component';

describe('BrowseAssignmentComponent', () => {
  let component: BrowseAssignmentComponent;
  let fixture: ComponentFixture<BrowseAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
