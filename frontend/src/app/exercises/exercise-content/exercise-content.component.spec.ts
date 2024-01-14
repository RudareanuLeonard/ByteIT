import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseContentComponent } from './exercise-content.component';

describe('ExerciseContentComponent', () => {
  let component: ExerciseContentComponent;
  let fixture: ComponentFixture<ExerciseContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseContentComponent]
    });
    fixture = TestBed.createComponent(ExerciseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
