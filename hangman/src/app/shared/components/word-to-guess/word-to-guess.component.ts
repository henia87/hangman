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
  @Input() hintedLetters: string[] = [];

  get letters(): { value: string | null, hinted: boolean }[] {
    // Return array of objects: letter value and whether it was hinted
    return this.word.split('').map(l =>
      this.guessedLetters.includes(l)
        ? { value: l, hinted: this.hintedLetters.includes(l) }
        : { value: null, hinted: false }
    );
  }
}
