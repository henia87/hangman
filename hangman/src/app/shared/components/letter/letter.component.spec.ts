import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LetterComponent } from './letter.component';

describe('LetterComponent', () => {
  let component: LetterComponent;
  let fixture: ComponentFixture<LetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the letter if provided', () => {
    component.letter = 'A';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.letter');
    expect(span.textContent.trim()).toBe('A');
  });

  it('should render a blank space if letter is null', () => {
    component.letter = null;
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.letter');
    expect(span.textContent).toMatch(/\s/);
  });

  it('should apply the hinted class if hinted is true', () => {
    component.letter = 'B';
    component.hinted = true;
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.letter');
    expect(span.classList).toContain('hinted');
  });
});
