import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voteValue'
})
export class VoteValuePipe implements PipeTransform {

  transform(value: number): any {
    return Number.isInteger(value) ? value.toFixed(1) : value;
  }

}
