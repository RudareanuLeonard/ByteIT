import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPopUpComponent } from './subscription-pop-up.component';

describe('SubscriptionPopUpComponent', () => {
  let component: SubscriptionPopUpComponent;
  let fixture: ComponentFixture<SubscriptionPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionPopUpComponent]
    });
    fixture = TestBed.createComponent(SubscriptionPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
