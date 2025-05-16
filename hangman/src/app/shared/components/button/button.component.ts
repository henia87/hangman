import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() icon?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  // Add more @Input()s as needed for modularity (e.g., disabled, color, etc.)
}
