import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMeetupsComponent } from './header-meetups.component';

describe('HeaderMeetupsComponent', () => {
  let component: HeaderMeetupsComponent;
  let fixture: ComponentFixture<HeaderMeetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMeetupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
