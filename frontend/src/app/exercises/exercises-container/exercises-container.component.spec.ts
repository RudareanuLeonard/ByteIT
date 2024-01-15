import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesContainerComponent } from './exercises-container.component';

describe('ExercisesContainerComponent', () => {
  let component: ExercisesContainerComponent;
  let fixture: ComponentFixture<ExercisesContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExercisesContainerComponent]
    });
    fixture = TestBed.createComponent(ExercisesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
