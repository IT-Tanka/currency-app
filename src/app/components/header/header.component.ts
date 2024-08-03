
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';
import { ICurrency } from '../../models/currency';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms'; 

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule] 
})
export default class HeaderComponent implements OnInit, OnDestroy {
    title = 'Currency-App';
    usdRate: number | null = null;
    eurRate: number | null = null;
    private subscription: Subscription = new Subscription();

    constructor(private currencyService: CurrencyService) { }

    ngOnInit(): void {
        this.subscription = this.currencyService.getAll().subscribe((data: ICurrency[]) => {
            const usd = data.find(currency => currency.ccy === 'USD');
            const eur = data.find(currency => currency.ccy === 'EUR');
            this.usdRate = usd ? usd.buy : null;
            this.eurRate = eur ? eur.buy : null;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
