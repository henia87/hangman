import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letter',
  standalone: false,
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.css'
})
export class LetterComponent {
  @Input() letter: string | null = null;
}
