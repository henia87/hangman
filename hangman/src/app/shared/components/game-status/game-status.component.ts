import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-status',
  standalone: false,
  templateUrl: './game-status.component.html',
  styleUrl: './game-status.component.css'
})
export class GameStatusComponent {
  @Input() attemptsLeft: number = 6;
  @Input() maxAttempts: number = 6;
  @Input() status: 'playing' | 'won' | 'lost' = 'playing';
}
