import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let gameService: GameService;
  let router: Router;

  beforeEach(async () => {
    const gameServiceMock = {
      gameState$: of({
        word: 'TEST',
        guessedLetters: [],
        correctGuesses: [],
        incorrectGuesses: [],
        maxErrors: 10,
        isGameOver: false,
        isGameWon: false,
        hintedLetters: []
      }),
      guessLetter: jest.fn(),
      restartGame: jest.fn(),
      nextGame: jest.fn(),
      showHint: jest.fn()
    };
    const routerMock = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      providers: [
        { provide: GameService, useValue: gameServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call gameService.guessLetter on onGuess', () => {
    component.onGuess('a');
    expect(gameService.guessLetter).toHaveBeenCalledWith('a');
  });

  it('should call gameService.restartGame and increment resetKey on onRestart', () => {
    const prevKey = component.resetKey;
    component.onRestart();
    expect(gameService.restartGame).toHaveBeenCalled();
    expect(component.resetKey).toBe(prevKey + 1);
  });

  it('should call gameService.nextGame and increment resetKey on onNewGame', () => {
    const prevKey = component.resetKey;
    component.onNewGame();
    expect(gameService.nextGame).toHaveBeenCalled();
    expect(component.resetKey).toBe(prevKey + 1);
  });

  it('should call gameService.showHint on onHint', () => {
    component.onHint();
    expect(gameService.showHint).toHaveBeenCalled();
  });

  it('should remove localStorage and navigate on onExit', () => {
    const removeSpy = jest.spyOn((window.localStorage as any)['__proto__'], 'removeItem');
    component.onExit();
    expect(removeSpy).toHaveBeenCalledWith('hangman-game-state');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
