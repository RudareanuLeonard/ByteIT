import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinecompilerComponent } from './onlinecompiler.component';

describe('OnlinecompilerComponent', () => {
  let component: OnlinecompilerComponent;
  let fixture: ComponentFixture<OnlinecompilerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlinecompilerComponent]
    });
    fixture = TestBed.createComponent(OnlinecompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
