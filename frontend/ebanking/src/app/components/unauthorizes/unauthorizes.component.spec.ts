import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizesComponent } from './unauthorizes.component';

describe('UnauthorizesComponent', () => {
  let component: UnauthorizesComponent;
  let fixture: ComponentFixture<UnauthorizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
