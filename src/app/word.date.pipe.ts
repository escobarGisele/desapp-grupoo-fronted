import { formatDate } from '@angular/common';
import {Pipe} from '@angular/core';

@Pipe({
    name: 'currencyDateFormat'
})
export class CurrencyDateFormat {
    transform(value: string, currency: string = 'AR'): string {
console.log(value, currency)
        if (currency == 'USD'){
            return formatDate(value , 'MM/dd/yyyy','en-us')
        }
        if (value == null || value == 'AR'){
            return formatDate(value , 'dd/mm/yyyy','es-ar')
        }
    }
}