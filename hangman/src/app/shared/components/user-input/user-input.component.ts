import { Component, Output, EventEmitter, OnChanges, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: false,
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent implements OnChanges {
  @Output() guess = new EventEmitter<string>();
  @Input() resetKey: number = 0;
  @Input() gameOver: boolean = false;
  form: FormGroup;
  @ViewChild('letterInput') letterInput?: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      letter: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]$/)]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gameOver']) {
      if (this.gameOver) {
        this.form.get('letter')?.disable({ emitEvent: false });
      } else {
        this.form.get('letter')?.enable({ emitEvent: false });
      }
    }
    if (changes['resetKey'] && !changes['resetKey'].firstChange) {
      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
      setTimeout(() => this.letterInput?.nativeElement.focus());
    }
  }

  onSubmit() {
    if (this.gameOver) {
      return;
    }
    if (this.form.valid) {
      this.guess.emit(this.form.value.letter.toLowerCase());
      this.form.reset();
      setTimeout(() => this.letterInput?.nativeElement.focus());
    } else {
      setTimeout(() => this.letterInput?.nativeElement.focus());
    }
  }
}
