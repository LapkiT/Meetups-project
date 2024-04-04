import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMeetupsComponent } from './register-meetups.component';

describe('RegisterMeetupsComponent', () => {
  let component: RegisterMeetupsComponent;
  let fixture: ComponentFixture<RegisterMeetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterMeetupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
