import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GameState {
  word: string;
  guessedLetters: string[];
  correctGuesses: string[];
  incorrectGuesses: string[];
  maxErrors: number;
  isGameOver: boolean;
  isGameWon: boolean;
}

export const initialGameState: GameState = {
  word: '',
  guessedLetters: [],
  correctGuesses: [],
  incorrectGuesses: [],
  maxErrors: 6,
  isGameOver: false,
  isGameWon: false
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _gameState = new BehaviorSubject<GameState>(initialGameState);
  public gameState$ = this._gameState.asObservable();


  constructor() { }
}
