import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button [type]="type" [disabled]="disabled" class="button" (click)="clicked()">{{ label }}</button>`,
  styleUrls: ['./button.component.css'],
  standalone:true
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter<void>();

  clicked(){
    this.click.emit
  }
}