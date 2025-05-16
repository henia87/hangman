import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  // Game state
  wordToGuess: string = 'BLACKMETALISTKRIEG';
  guessedLetters: string[] = [];
  incorrectGuesses: number = 0;
  maxAttempts: number = 10;
  attemptsLeft: number = 10;
  gameStatus: 'playing' | 'won' | 'lost' = 'playing';
  feedback: 'correct' | 'incorrect' | null = null;

  // Handle a letter guess
  onGuess(letter: string) {
    if (this.gameStatus !== 'playing' || !letter || this.guessedLetters.includes(letter)) {
      return;
    }
    this.guessedLetters.push(letter);
    if (this.wordToGuess.includes(letter)) {
      this.feedback = 'correct';
      if (this.wordToGuess.split('').every(l => this.guessedLetters.includes(l))) {
        this.gameStatus = 'won';
      }
    } else {
      this.feedback = 'incorrect';
      this.incorrectGuesses++;
      this.attemptsLeft = this.maxAttempts - this.incorrectGuesses;
      if (this.incorrectGuesses >= this.maxAttempts) {
        this.gameStatus = 'lost';
      }
    }
  }

  // Restart the current game
  onRestart() {
    this.resetGame(this.wordToGuess);
  }

  // Start a new game (for now, just resets with the same word)
  onNextGame() {
    // In a real app, pick a new word here
    this.resetGame('BLACKMETALISTKRIEG');
  }

  // Show a hint (for now, just alert)
  onHint() {
    // Example: reveal a random unguessed letter
    const unguessed = this.wordToGuess.split('').filter(l => !this.guessedLetters.includes(l));
    if (unguessed.length > 0) {
      alert('Hint: ' + unguessed[Math.floor(Math.random() * unguessed.length)]);
    }
  }

  private resetGame(word: string) {
    this.wordToGuess = word;
    this.guessedLetters = [];
    this.incorrectGuesses = 0;
    this.attemptsLeft = this.maxAttempts;
    this.gameStatus = 'playing';
    this.feedback = null;
  }
}
