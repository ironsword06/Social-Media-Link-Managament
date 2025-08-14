import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'atom-button',
  standalone: true,
  templateUrl: './atom-btn.component.html',
  styleUrls: ['./atom-btn.component.css'], 
  imports: [MatIconModule, MatButtonModule, CommonModule],
})
export class AtomButtonComponent {
  @Input() text: string = ''; 
  @Input() icon: string = ''; 
  @Output() clicked = new EventEmitter<void>(); 

  onClick() {
    this.clicked.emit();
  }
}
