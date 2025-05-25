import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameState$;
  resetKey = 0;

  constructor(public gameService: GameService, private router: Router) {
    this.gameState$ = this.gameService.gameState$;
  }

  onGuess(letter: string) {
    this.gameService.guessLetter(letter);
  }

  onRestart() {
    this.gameService.restartGame();
    this.resetKey++;
  }

  onNewGame() {
    this.gameService.nextGame();
    this.resetKey++;
  }

  onHint() {
    this.gameService.showHint();
  }

  onExit() {
    localStorage.removeItem('hangman-game-state');
    this.router.navigate(['/']);
  }
}
