import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMeetupsPegesComponent } from './all-meetups-peges.component';

describe('AllMeetupsPegesComponent', () => {
  let component: AllMeetupsPegesComponent;
  let fixture: ComponentFixture<AllMeetupsPegesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMeetupsPegesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllMeetupsPegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
