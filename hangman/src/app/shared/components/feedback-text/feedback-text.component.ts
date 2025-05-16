import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-text',
  standalone: false,
  templateUrl: './feedback-text.component.html',
  styleUrl: './feedback-text.component.css'
})
export class FeedbackTextComponent {
  @Input() feedback: 'correct' | 'incorrect' | null = null;
}
