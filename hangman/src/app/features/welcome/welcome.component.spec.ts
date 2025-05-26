import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let gameService: any;
  let router: any;

  beforeEach(async () => {
    const gameServiceMock = { nextGame: jest.fn() };
    const routerMock = { navigate: jest.fn() };
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [
        { provide: GameService, useValue: gameServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call nextGame and navigate to /game on onPlay', () => {
    component.onPlay();
    expect(gameService.nextGame).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/game']);
  });
});
