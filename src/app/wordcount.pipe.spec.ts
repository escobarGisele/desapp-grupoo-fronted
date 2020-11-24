import { CurrencyMoneyFormat } from './wordcount.pipe';

describe('WordcountPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyMoneyFormat();
    expect(pipe).toBeTruthy();
  });
});
