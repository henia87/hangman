import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word-to-guess',
  standalone: false,
  templateUrl: './word-to-guess.component.html',
  styleUrl: './word-to-guess.component.css'
})
export class WordToGuessComponent {
  @Input() word: string = '';
  @Input() guessedLetters: string[] = [];

  get letters(): (string | null)[] {
    // Return array of letters or underscores based on guessedLetters
    return this.word.split('').map(l => this.guessedLetters.includes(l) ? l : null);
  }
}
