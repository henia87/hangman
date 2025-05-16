import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guessed-letters',
  standalone: false,
  templateUrl: './guessed-letters.component.html',
  styleUrl: './guessed-letters.component.css'
})
export class GuessedLettersComponent {
  @Input() guessed: string[] = [];
}
