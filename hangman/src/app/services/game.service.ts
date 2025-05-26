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
  hintedLetters?: string[];
}

export const initialGameState: GameState = {
  word: '',
  guessedLetters: [],
  correctGuesses: [],
  incorrectGuesses: [],
  maxErrors: 10,
  isGameOver: false,
  isGameWon: false,
  hintedLetters: []
};

const GAME_STATE_STORAGE_KEY = 'hangman-game-state';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _gameState = new BehaviorSubject<GameState>(GameService.loadState() || { ...initialGameState });
  public gameState$ = this._gameState.asObservable();
  private wordList: string[] = [
    'hellfire', 'infernal', 'apocalypse', 'damnation', 'hellhound', 'reaper', 'mosh', 'shred', 'thrash', 'riff',
    'blastbeat', 'breakdown', 'corpsepaint', 'headbang', 'pit', 'horns', 'distortion', 'scream', 'growl', 'brutal',
    'abyss', 'chaos', 'doom', 'darkness', 'inferno', 'cult', 'ritual', 'death', 'torment',
    'amp', 'pedal', 'stage', 'mic', 'drumkit', 'guitar', 'bass', 'stack', 'snare', 'cymbals'
  ];

  constructor() {
    this.gameState$.subscribe(state => {
      GameService.saveState(state);
    });
  }

  static saveState(state: GameState) {
    try {
      localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Fallback: ignore if storage is full or unavailable
    }
  }

  static loadState(): GameState | null {
    try {
      const data = localStorage.getItem(GAME_STATE_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  guessLetter(letter: string, hinted: boolean = false) {
    const state = { ...this._gameState.value };
    const upperLetter = letter.toUpperCase();
    if (state.isGameOver || state.isGameWon || state.guessedLetters.includes(upperLetter)) {
      return;
    }
    state.guessedLetters.push(upperLetter);
    if (state.word.includes(upperLetter)) {
      state.correctGuesses.push(upperLetter);
      if (!state.hintedLetters) state.hintedLetters = [];
      if (hinted) state.hintedLetters.push(upperLetter);
      const uniqueLetters = Array.from(new Set(state.word.split('')));
      if (uniqueLetters.every(l => state.guessedLetters.includes(l))) {
        state.isGameWon = true;
      }
    } else {
      state.incorrectGuesses.push(upperLetter);
      if (state.incorrectGuesses.length >= state.maxErrors) {
        state.isGameOver = true;
      }
    }
    this._gameState.next(state);
  }

  restartGame() {
    const word = this._gameState.value.word.toUpperCase();
    this._gameState.next({
      ...initialGameState,
      word,
      maxErrors: 10,
      guessedLetters: [],
      correctGuesses: [],
      incorrectGuesses: []
    });
  }

  nextGame() {
    let newWord: string;
    do {
      newWord = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
    } while (newWord === this._gameState.value.word && this.wordList.length > 1);
    this._gameState.next({
      ...initialGameState,
      word: newWord,
      maxErrors: 10,
      guessedLetters: [],
      correctGuesses: [],
      incorrectGuesses: []
    });
  }

  showHint() {
    const state = this._gameState.value;
    const unguessed = state.word.split('').filter(l => !state.guessedLetters.includes(l));
    if (unguessed.length > 0) {
      const hintLetter = unguessed[Math.floor(Math.random() * unguessed.length)];
      this.guessLetter(hintLetter, true);
    }
  }
}
