import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-input',
  standalone: false,
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  userInput: string = '';

  @Output() guess = new EventEmitter<string>();

  onSubmit() {
    if (this.userInput && this.userInput.length === 1 && /^[a-zA-Z]$/.test(this.userInput)) {
      this.guess.emit(this.userInput.toLowerCase());
      this.userInput = '';
    }
  }
}
