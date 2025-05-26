import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GameStatusComponent } from './game-status.component';

describe('GameStatusComponent', () => {
  let component: GameStatusComponent;
  let fixture: ComponentFixture<GameStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameStatusComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display attempts left and max attempts', () => {
    component.attemptsLeft = 3;
    component.maxAttempts = 7;
    fixture.detectChanges();
    const attempts = fixture.nativeElement.querySelector('.attempts');
    expect(attempts.textContent).toContain('3 / 7');
  });

  it('should show status as Playing... when status is playing', () => {
    component.status = 'playing';
    fixture.detectChanges();
    const statusText = fixture.nativeElement.querySelector('.status-text');
    expect(statusText.textContent).toContain('Playing...');
    expect(statusText.classList).toContain('playing');
  });

  it('should show status as You won! when status is won', () => {
    component.status = 'won';
    fixture.detectChanges();
    const statusText = fixture.nativeElement.querySelector('.status-text');
    expect(statusText.textContent).toContain('You won!');
    expect(statusText.classList).toContain('won');
  });

  it('should show status as Game Over! when status is lost', () => {
    component.status = 'lost';
    fixture.detectChanges();
    const statusText = fixture.nativeElement.querySelector('.status-text');
    expect(statusText.textContent).toContain('Game Over!');
    expect(statusText.classList).toContain('lost');
  });

  it('should set progress bar width according to attempts left', () => {
    component.attemptsLeft = 2;
    component.maxAttempts = 4;
    fixture.detectChanges();
    const progress = fixture.nativeElement.querySelector('.progress');
    expect(progress.style.width).toBe('50%');
  });
});
