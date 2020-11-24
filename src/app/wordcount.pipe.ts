import {Pipe} from '@angular/core';

@Pipe({
    name: 'currencyMoneyFormat'
})
export class CurrencyMoneyFormat {
    transform(value: string,
        currency: string = 'ARS',
        ): string {

        let decimalLength: number = 2;
        let chunkDelimiter: string = '.' ;
        let decimalDelimiter: string = ',' ;
        let chunkLength: number = 3 ;
        let currencySign: string = '$ ';
        let val: number;

        if (currency == 'USD'){
            chunkDelimiter = ',';
            decimalDelimiter = '.';
            currencySign = '$ ';
        }
        if (value == null){
            value = '0.0';
        }
        
        val = parseFloat(value);
//      val /= 100;

         let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')'
        let num = val.toFixed(Math.max(0, ~~decimalLength));

        return currencySign+(decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
    }
}