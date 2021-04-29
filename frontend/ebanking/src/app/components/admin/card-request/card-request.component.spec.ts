import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRequestComponent } from './card-request.component';

describe('CardRequestComponent', () => {
  let component: CardRequestComponent;
  let fixture: ComponentFixture<CardRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
