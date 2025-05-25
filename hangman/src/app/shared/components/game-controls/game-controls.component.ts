import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  standalone: false,
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.css'
})
export class GameControlsComponent {
  @Output() restart = new EventEmitter<void>();
  @Output() newGame = new EventEmitter<void>();
  @Output() hint = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();
}
