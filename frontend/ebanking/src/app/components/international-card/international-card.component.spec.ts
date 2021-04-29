import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalCardComponent } from './international-card.component';

describe('InternationalCardComponent', () => {
  let component: InternationalCardComponent;
  let fixture: ComponentFixture<InternationalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
