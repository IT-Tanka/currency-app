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
    this.subscription.add(
      interval(60000).pipe(
        switchMap(() => this.currencyService.getAll())
      ).subscribe((data) => {
        this.currencies = data;
        this.currencies.push({
          ccy: 'UAH',
          base_ccy: 'UAH',
          buy: 1,
          sale: 1
        });

        const usd = this.currencies.find(currency => currency.ccy === 'USD');
        const eur = this.currencies.find(currency => currency.ccy === 'EUR');
        this.usdRate = usd ? usd.buy : null;
        this.eurRate = eur ? eur.buy : null;

        this.updateConversion('currency1', 'currency2');
        this.updateConversion('currency2', 'currency1');
      })
    );

    this.form.get('currency1')?.valueChanges.subscribe(value => {
      this.updateConversion('currency1', 'currency2');
    });

    this.form.get('currency2')?.valueChanges.subscribe(value => {
      this.updateConversion('currency2', 'currency1');
    });


    this.currencyService.getAll().subscribe((data) => {
      this.currencies = data;
      this.currencies.push({
        ccy: 'UAH',
        base_ccy: 'UAH',
        buy: 1,
        sale: 1
      });

      const usd = this.currencies.find(currency => currency.ccy === 'USD');
      const eur = this.currencies.find(currency => currency.ccy === 'EUR');
      this.usdRate = usd ? usd.buy : null;
      this.eurRate = eur ? eur.buy : null;

      this.updateConversion('currency1', 'currency2');
      this.updateConversion('currency2', 'currency1');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateConversion(from: string, to: string) {
    const fromValue = this.form.get(from)?.value;
    const toValue = this.form.get(to)?.value;

    const fromCurrency = this.currencies.find(currency => currency.ccy === fromValue.selectedCurrency);
    const toCurrency = this.currencies.find(currency => currency.ccy === toValue.selectedCurrency);

    if (fromCurrency && toCurrency) {
      const convertedAmount = (fromValue.amount * (fromCurrency.sale || 1)) / (toCurrency.buy || 1);
      this.form.get(to)?.setValue({
        amount: parseFloat(convertedAmount.toFixed(2)), 
        selectedCurrency: toValue.selectedCurrency
      }, { emitEvent: false });
    }
  }

}
