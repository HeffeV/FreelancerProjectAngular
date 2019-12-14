import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagereviewsComponent } from './managereviews.component';

describe('ManagereviewsComponent', () => {
  let component: ManagereviewsComponent;
  let fixture: ComponentFixture<ManagereviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagereviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagereviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
