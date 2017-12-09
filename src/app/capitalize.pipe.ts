import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
 
  transform(value: string): string {
    if (!value) return value;
    return value.split(/\b/g).map(word => titleCaseWord(word)).join('');
  }
}

function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}
