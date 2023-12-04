import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPopUpComponent } from './sign-up-pop-up.component';

describe('SignUpPopUpComponent', () => {
  let component: SignUpPopUpComponent;
  let fixture: ComponentFixture<SignUpPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpPopUpComponent]
    });
    fixture = TestBed.createComponent(SignUpPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
