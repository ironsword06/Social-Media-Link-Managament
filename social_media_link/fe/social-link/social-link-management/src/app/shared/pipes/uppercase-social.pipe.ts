import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseSocial',
  standalone:true
})
export class UppercaseSocialPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.toUpperCase();
  }
}