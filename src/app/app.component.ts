import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrencyService } from './services/currency.service';
import { ICurrency } from './models/currency';
import { CurrencyComponent } from './components/currency/currency.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyComponent, HeaderComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currencies: ICurrency[] = [];
  usdRate: number | null = null;
  eurRate: number | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private currencyService: CurrencyService) {
    this.form = new FormGroup({
      currency1: new FormControl({ amount: 0, selectedCurrency: 'EUR' }),
      currency2: new FormControl({ amount: 0, selectedCurrency: 'EUR' })
    });
  }

  ngOnInit(): void {
    this.setupIntervalForCurrencyUpdates();
    this.setupFormValueChanges();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setupIntervalForCurrencyUpdates(): void {
    this.subscription.add(
      interval(1000000).pipe(
        switchMap(() => this.currencyService.getCurrencies())
      ).subscribe((data) => {
        this.updateCurrencies(data);
        this.updateConversions();
      })
    );
  }

  private setupFormValueChanges(): void {
    this.form.get('currency1')?.valueChanges.subscribe(value => {
      this.updateConversion('currency1', 'currency2', value);
    });

    this.form.get('currency2')?.valueChanges.subscribe(value => {
      this.updateConversion('currency2', 'currency1', value);
    });
  }

  private loadInitialData(): void {
    this.currencyService.getCurrencies().subscribe((data) => {
      this.updateCurrencies(data);
      this.updateConversions();
    });
  }

  private updateCurrencies(data: ICurrency[]): void {
    this.currencies = [...data, { ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1 }];
    this.usdRate = this.getCurrencyRate('USD');
    this.eurRate = this.getCurrencyRate('EUR');
  }

  private getCurrencyRate(ccy: string): number | null {
    const currency = this.currencies.find(c => c.ccy === ccy);
    return currency ? currency.buy : null;
  }

  private updateConversions(): void {
    this.updateConversion('currency1', 'currency2', this.form.get('currency1')?.value);
    this.updateConversion('currency2', 'currency1', this.form.get('currency2')?.value);
  }

  private updateConversion(from: string, to: string, fromValue: any): void {
    const toValue = this.form.get(to)?.value;
    const fromCurrency = this.currencies.find(currency => currency.ccy === fromValue.selectedCurrency);
    const toCurrency = this.currencies.find(currency => currency.ccy === toValue.selectedCurrency);

    if (fromCurrency && toCurrency) {
      const convertedAmount = this.convertAmount(fromValue.amount, fromCurrency.sale, toCurrency.buy);
      this.form.get(to)?.setValue({
        amount: parseFloat(convertedAmount.toFixed(2)),
        selectedCurrency: toValue.selectedCurrency
      }, { emitEvent: false });
    }
  }

  private convertAmount(amount: number, saleRate: number | undefined, buyRate: number | undefined): number {
    return (amount * (saleRate || 1)) / (buyRate || 1);
  }
}

