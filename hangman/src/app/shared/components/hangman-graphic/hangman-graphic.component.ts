import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hangman-graphic',
  standalone: false,
  templateUrl: './hangman-graphic.component.html',
  styleUrl: './hangman-graphic.component.css'
})
export class HangmanGraphicComponent {
  @Input() incorrectGuesses: number = 0;
}
