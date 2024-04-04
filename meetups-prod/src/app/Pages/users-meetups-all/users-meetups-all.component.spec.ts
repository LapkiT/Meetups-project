import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMeetupsAllComponent } from './users-meetups-all.component';

describe('UsersMeetupsAllComponent', () => {
  let component: UsersMeetupsAllComponent;
  let fixture: ComponentFixture<UsersMeetupsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMeetupsAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersMeetupsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
