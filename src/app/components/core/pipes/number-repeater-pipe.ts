import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberRepeater' })
export class NumberRepeater implements PipeTransform {
  transform(value, args: string[] = undefined): any {
    let res = [];
    for (let i = 0; i < value; i++) {
      res.push(i);
    }
    return res;
  }
}