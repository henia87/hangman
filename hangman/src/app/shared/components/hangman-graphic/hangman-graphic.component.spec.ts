import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HangmanGraphicComponent } from './hangman-graphic.component';

describe('HangmanGraphicComponent', () => {
  let component: HangmanGraphicComponent;
  let fixture: ComponentFixture<HangmanGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HangmanGraphicComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangmanGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the drawing as incorrectGuesses increases', () => {
    component.incorrectGuesses = 0;
    fixture.detectChanges();
    let svg = fixture.nativeElement.querySelector('svg');
    expect(svg.querySelectorAll('path, circle').length).toBe(0);

    component.incorrectGuesses = 5;
    fixture.detectChanges();
    expect(svg.querySelectorAll('path, circle').length).toBe(5);

    component.incorrectGuesses = 10;
    fixture.detectChanges();
    expect(svg.querySelectorAll('path, circle').length).toBe(10);
  });
});
