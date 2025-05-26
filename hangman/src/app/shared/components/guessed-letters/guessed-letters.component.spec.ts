import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GuessedLettersComponent } from './guessed-letters.component';

describe('GuessedLettersComponent', () => {
  let component: GuessedLettersComponent;
  let fixture: ComponentFixture<GuessedLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuessedLettersComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessedLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render guessed letters', () => {
    component.guessed = ['a', 'b', 'c'];
    component.word = 'cab';
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('A');
    expect(text).toContain('B');
    expect(text).toContain('C');
  });

  it('should mark correct letters', () => {
    component.guessed = ['a', 'b', 'c'];
    component.word = 'cab';
    fixture.detectChanges();
    expect(component.isCorrect('a')).toBe(true);
    expect(component.isCorrect('b')).toBe(true);
    expect(component.isCorrect('c')).toBe(true);
    expect(component.isCorrect('d')).toBe(false);
  });

  it('should mark hinted letters', () => {
    component.guessed = ['a', 'b', 'c'];
    component.word = 'cab';
    component.hintedLetters = ['b'];
    fixture.detectChanges();
    expect(component.isHinted('b')).toBe(true);
    expect(component.isHinted('a')).toBe(false);
  });
});
