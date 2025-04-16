import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceParts'
})
export class PricePartsPipe implements PipeTransform {

  transform(value: number, part: 'symbol' | 'integer' | 'fraction', currency: string = 'USD'): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });

    const formatted = formatter.format(value); // Example: "$123.45"
    const numericPart = formatted.slice(1);
    const [integer, fraction] = numericPart.split('.');

    const symbol = formatted.slice(0, 1);

    switch (part) {
      case 'symbol':
        return symbol;
      case 'integer':
        return integer;
      case 'fraction':
        return fraction ? '.' + fraction : '';
      default:
        return '';
    }
  }
}