import { Component, Output, EventEmitter, OnChanges, Input, SimpleChanges } from '@angular/core';
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
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      letter: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]$/)]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['resetKey'] && !changes['resetKey'].firstChange) {
      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.guess.emit(this.form.value.letter.toLowerCase());
      this.form.reset();
    }
  }
}
