import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length = 50): unknown {
    return value.slice(0, length) + (value.length > length ? '...' : '');
  }

}
