import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalUsersComponent } from './total-users.component';

describe('TotalUsersComponent', () => {
  let component: TotalUsersComponent;
  let fixture: ComponentFixture<TotalUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
