import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FeedbackTextComponent } from './feedback-text.component';

describe('FeedbackTextComponent', () => {
  let component: FeedbackTextComponent;
  let fixture: ComponentFixture<FeedbackTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackTextComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nothing when feedback is null', () => {
    component.feedback = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe('');
  });

  it('should render correct feedback', () => {
    component.feedback = 'correct';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.toLowerCase()).toContain('correct');
  });

  it('should render incorrect feedback', () => {
    component.feedback = 'incorrect';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.toLowerCase()).toContain('incorrect');
  });
});
