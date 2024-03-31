import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupsTaskComponent } from './meetups-task.component';

describe('MeetupsTaskComponent', () => {
  let component: MeetupsTaskComponent;
  let fixture: ComponentFixture<MeetupsTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetupsTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetupsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
