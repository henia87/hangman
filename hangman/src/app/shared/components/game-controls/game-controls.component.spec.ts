import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GameControlsComponent } from './game-controls.component';

describe('GameControlsComponent', () => {
  let component: GameControlsComponent;
  let fixture: ComponentFixture<GameControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameControlsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit restart when Restart button is clicked', () => {
    jest.spyOn(component.restart, 'emit');
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[0];
    btn.triggerEventHandler('click', {});
    expect(component.restart.emit).toHaveBeenCalled();
  });

  it('should emit newGame when New Game button is clicked', () => {
    jest.spyOn(component.newGame, 'emit');
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[1];
    btn.triggerEventHandler('click', {});
    expect(component.newGame.emit).toHaveBeenCalled();
  });

  it('should emit hint when Hint button is clicked', () => {
    jest.spyOn(component.hint, 'emit');
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[2];
    btn.triggerEventHandler('click', {});
    expect(component.hint.emit).toHaveBeenCalled();
  });

  it('should emit exit when Exit button is clicked', () => {
    jest.spyOn(component.exit, 'emit');
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[3];
    btn.triggerEventHandler('click', {});
    expect(component.exit.emit).toHaveBeenCalled();
  });

  it('should emit restart output (EventEmitter) when button is clicked', () => {
    let emitted = false;
    component.restart.subscribe(() => emitted = true);
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[0];
    btn.triggerEventHandler('click', {});
    expect(emitted).toBe(true);
  });

  it('should emit newGame output (EventEmitter) when button is clicked', () => {
    let emitted = false;
    component.newGame.subscribe(() => emitted = true);
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[1];
    btn.triggerEventHandler('click', {});
    expect(emitted).toBe(true);
  });

  it('should emit hint output (EventEmitter) when button is clicked', () => {
    let emitted = false;
    component.hint.subscribe(() => emitted = true);
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[2];
    btn.triggerEventHandler('click', {});
    expect(emitted).toBe(true);
  });

  it('should emit exit output (EventEmitter) when button is clicked', () => {
    let emitted = false;
    component.exit.subscribe(() => emitted = true);
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[3];
    btn.triggerEventHandler('click', {});
    expect(emitted).toBe(true);
  });
});
