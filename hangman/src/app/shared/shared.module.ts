import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInputComponent } from './components/user-input/user-input.component';
import { LetterComponent } from './components/letter/letter.component';
import { GuessedLettersComponent } from './components/guessed-letters/guessed-letters.component';
import { WordToGuessComponent } from './components/word-to-guess/word-to-guess.component';
import { HangmanGraphicComponent } from './components/hangman-graphic/hangman-graphic.component';
import { FeedbackTextComponent } from './components/feedback-text/feedback-text.component';
import { GameStatusComponent } from './components/game-status/game-status.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    UserInputComponent,
    LetterComponent,
    GuessedLettersComponent,
    WordToGuessComponent,
    HangmanGraphicComponent,
    FeedbackTextComponent,
    GameStatusComponent,
    GameControlsComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserInputComponent,
    LetterComponent,
    GuessedLettersComponent,
    WordToGuessComponent,
    HangmanGraphicComponent,
    FeedbackTextComponent,
    GameStatusComponent,
    GameControlsComponent,
    ButtonComponent,
  ]
})
export class SharedModule { }
