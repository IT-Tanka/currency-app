import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyService } from '../../services/currency.service';
import { FormsModule } from '@angular/forms';
import { ICurrency } from '../../models/currency';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.css'],
    standalone: true,
    imports: [CommonModule, HttpClientModule, FormsModule]
})
export class CurrencyComponent implements OnInit, OnDestroy {
    currencies: ICurrency[] = [];
    currency1: string = 'USD';
    currency2: string = 'UAH';
    amount1: string = '1';
    amount2: string = '0';
    private subscription: Subscription = new Subscription();

    constructor(private currencyService: CurrencyService) { }

    ngOnInit(): void {
        this.subscription = this.currencyService.getAll().subscribe((data: ICurrency[]) => {
            this.currencies = data;
            this.convert('first');
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    convert(source: string): void {
        if (source === 'first') {
            const rate1 = this.getRate(this.currency1, this.currency2);
            this.amount2 = (parseFloat(this.amount1) * rate1).toFixed(2);
        } else {
            const rate2 = this.getRate(this.currency2, this.currency1);
            this.amount1 = (parseFloat(this.amount2) * rate2).toFixed(2);
        }
    }

    getRate(from: string, to: string): number {
        if (from === 'UAH') {
            return 1 / (this.currencies.find(currency => currency.ccy === to)?.buy ?? 1);
        }
        if (to === 'UAH') {
            return this.currencies.find(currency => currency.ccy === from)?.sale ?? 1;
        }
        const fromRate = this.currencies.find(currency => currency.ccy === from)?.sale ?? 1;
        const toRate = this.currencies.find(currency => currency.ccy === to)?.buy ?? 1;
        return fromRate / toRate;
    }
}
