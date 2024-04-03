import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMeetupsComponent } from './login-meetups.component';

describe('LoginMeetupsComponent', () => {
  let component: LoginMeetupsComponent;
  let fixture: ComponentFixture<LoginMeetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginMeetupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
