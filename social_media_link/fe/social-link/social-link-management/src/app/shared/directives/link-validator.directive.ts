import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[linkValidator]',
  standalone: true,
})
export class LinkValidatorDirective {

  private errorElement: HTMLElement | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.errorElement = this.el.nativeElement.nextElementSibling;
  }

  @HostListener('input') onInput() {
    this.updateUI('', false);
  }

  @HostListener('blur') onBlur() {
    const value: string = this.el.nativeElement.value;
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    const isValid = regex.test(value);

    this.updateUI(isValid ? 'green' : 'red', !isValid);
  }

  private updateUI(borderColor: string, showError: boolean) {
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', borderColor);
    
    if (this.errorElement) {
      this.renderer.setStyle(this.errorElement, 'display', showError ? 'block' : 'none');
      this.renderer.setStyle(this.errorElement, 'color', showError ? 'red' : 'inherit');
    }
  }
}
