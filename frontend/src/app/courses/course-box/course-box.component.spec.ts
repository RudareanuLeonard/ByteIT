import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBoxComponent } from './course-box.component';

describe('CourseBoxComponent', () => {
  let component: CourseBoxComponent;
  let fixture: ComponentFixture<CourseBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseBoxComponent]
    });
    fixture = TestBed.createComponent(CourseBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
