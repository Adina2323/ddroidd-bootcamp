import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPageComponent } from './final-page.component';

describe('FinalPageComponent', () => {
  let component: FinalPageComponent;
  let fixture: ComponentFixture<FinalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalPageComponent]
    });
    fixture = TestBed.createComponent(FinalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
