import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameService, initialGameState, GameState } from './game.service';

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; },
    _getStore: () => store
  };
})();

describe('GameService', () => {
  let service: GameService;
  let originalLocalStorage: any;

  beforeAll(() => {
    originalLocalStorage = { ...window.localStorage };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  });

  afterAll(() => {
    Object.defineProperty(window, 'localStorage', { value: originalLocalStorage });
  });

  beforeEach(() => {
    mockLocalStorage.clear();
    TestBed.configureTestingModule({
      providers: [GameService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(GameService);
    service['wordList'] = ['TEST', 'MOCK'];
    service.nextGame();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with a word from the list', done => {
    service.gameState$.subscribe(state => {
      expect(state.word).toMatch(/TEST|MOCK/);
      done();
    });
  });

  it('should save and load state from localStorage', () => {
    const state: GameState = { ...initialGameState, word: 'SAVED' };
    GameService.saveState(state);
    const loaded = GameService.loadState();
    expect(loaded).toEqual(state);
  });

  it('should return null from loadState() if localStorage throws', () => {
    const spy = jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => { throw new Error('fail'); });
    expect(GameService.loadState()).toBeNull();
    spy.mockRestore();
  });

  it('should guess a correct letter', done => {
    service['wordList'] = ['TEST'];
    service.nextGame();
    service.guessLetter('T');
    service.gameState$.subscribe(state => {
      expect(state.correctGuesses).toContain('T');
      expect(state.guessedLetters).toContain('T');
      expect(state.incorrectGuesses).not.toContain('T');
      done();
    });
  });

  it('should guess an incorrect letter', done => {
    service.guessLetter('Z');
    service.gameState$.subscribe(state => {
      expect(state.incorrectGuesses).toContain('Z');
      expect(state.guessedLetters).toContain('Z');
      expect(state.correctGuesses).not.toContain('Z');
      done();
    });
  });

  it('should not allow duplicate guesses', () => {
    service.guessLetter('A');
    const prevState = { ...service['_gameState'].value };
    service.guessLetter('A');
    expect(service['_gameState'].value).toEqual(prevState);
  });

  it('should win the game when all unique letters are guessed', done => {
    service['wordList'] = ['AB'];
    service.nextGame();
    service.guessLetter('A');
    service.guessLetter('B');
    service.gameState$.subscribe(state => {
      if (state.isGameWon) {
        expect(state.isGameWon).toBe(true);
        done();
      }
    });
  });

  it('should lose the game after max incorrect guesses', done => {
    service['wordList'] = ['A'];
    service.nextGame();
    for (let i = 0; i < 10; i++) {
      service.guessLetter(String.fromCharCode(66 + i));
    }
    service.gameState$.subscribe(state => {
      if (state.isGameOver) {
        expect(state.isGameOver).toBe(true);
        done();
      }
    });
  });

  it('should restart the game with the same word', done => {
    const word = service['_gameState'].value.word;
    service.guessLetter('Z');
    service.restartGame();
    service.gameState$.subscribe(state => {
      expect(state.word).toBe(word);
      expect(state.guessedLetters.length).toBe(0);
      expect(state.correctGuesses.length).toBe(0);
      expect(state.incorrectGuesses.length).toBe(0);
      done();
    });
  });

  it('should start a new game with a different word', done => {
    service['wordList'] = ['ONE', 'TWO'];
    service.nextGame();
    const prevWord = service['_gameState'].value.word;
    service.nextGame();
    service.gameState$.subscribe(state => {
      expect(state.word).not.toBe(prevWord);
      done();
    });
  });

  it('should show a hint and mark it as hinted', done => {
    service['wordList'] = ['AB'];
    service.nextGame();
    service.showHint();
    service.gameState$.subscribe(state => {
      expect(state.hintedLetters && state.hintedLetters.length).toBeGreaterThan(0);
      expect(state.correctGuesses.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should not guess if game is over or won', () => {
    service['_gameState'].next({ ...service['_gameState'].value, isGameOver: true });
    const prevState = { ...service['_gameState'].value };
    service.guessLetter('X');
    expect(service['_gameState'].value).toEqual(prevState);
    service['_gameState'].next({ ...service['_gameState'].value, isGameOver: false, isGameWon: true });
    service.guessLetter('Y');
    expect(service['_gameState'].value).toEqual({ ...prevState, isGameOver: false, isGameWon: true });
  });

  it('should not show a hint if all letters are guessed', () => {
    service['wordList'] = ['A'];
    service.nextGame();
    service.guessLetter('A');
    const prevState = { ...service['_gameState'].value };
    service.showHint();
    expect(service['_gameState'].value).toEqual(prevState);
  });

  it('should initialize hintedLetters if undefined when hinting', done => {
    service['wordList'] = ['TEST'];
    service.nextGame();
    const state = { ...service['_gameState'].value };
    delete state.hintedLetters;
    service['_gameState'].next(state);
    service.guessLetter('T', true);
    service.gameState$.subscribe(newState => {
      expect(Array.isArray(newState.hintedLetters)).toBe(true);
      expect(newState.hintedLetters).toContain('T');
      done();
    });
  });
});
