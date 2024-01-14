import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePopUpComponent } from './edit-profile-pop-up.component';

describe('EditProfilePopUpComponent', () => {
  let component: EditProfilePopUpComponent;
  let fixture: ComponentFixture<EditProfilePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfilePopUpComponent]
    });
    fixture = TestBed.createComponent(EditProfilePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
