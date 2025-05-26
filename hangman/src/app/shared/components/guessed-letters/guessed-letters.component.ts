import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guessed-letters',
  standalone: false,
  templateUrl: './guessed-letters.component.html',
  styleUrl: './guessed-letters.component.css'
})
export class GuessedLettersComponent {
  @Input() guessed: string[] = [];
  @Input() word: string = '';
  @Input() hintedLetters: string[] = [];

  isCorrect(letter: string): boolean {
    return this.word.includes(letter);
  }

  isHinted(letter: string): boolean {
    return this.hintedLetters.includes(letter);
  }
}
