import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageskillsComponent } from './manageskills.component';

describe('ManageskillsComponent', () => {
  let component: ManageskillsComponent;
  let fixture: ComponentFixture<ManageskillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageskillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
