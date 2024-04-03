import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingTasksComponent } from './adding-tasks.component';

describe('AddingTasksComponent', () => {
  let component: AddingTasksComponent;
  let fixture: ComponentFixture<AddingTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
