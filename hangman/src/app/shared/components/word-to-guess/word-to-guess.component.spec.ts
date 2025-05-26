import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WordToGuessComponent } from './word-to-guess.component';

describe('WordToGuessComponent', () => {
  let component: WordToGuessComponent;
  let fixture: ComponentFixture<WordToGuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordToGuessComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordToGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute letters array with guessed and hinted info', () => {
    component.word = 'test';
    component.guessedLetters = ['t', 'e'];
    component.hintedLetters = ['e'];
    fixture.detectChanges();
    const letters = component.letters;
    expect(letters).toEqual([
      { value: 't', hinted: false },
      { value: 'e', hinted: true },
      { value: null, hinted: false },
      { value: 't', hinted: false }
    ]);
  });

  it('should render app-letter for each letter in the word', () => {
    component.word = 'hi';
    component.guessedLetters = ['h', 'i'];
    fixture.detectChanges();
    const letterEls = fixture.nativeElement.querySelectorAll('app-letter');
    expect(letterEls.length).toBe(2);
  });
});
