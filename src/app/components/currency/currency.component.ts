import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICurrency } from '../../models/currency';

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CurrencyComponent),
            multi: true
        }
    ],
    standalone: true,
    imports: [CommonModule]
})
export class CurrencyComponent implements ControlValueAccessor {
    @Input() currencies: ICurrency[] = [];
    @Input() amount: number = 0;
    @Input() selectedCurrency: string = '';

    @Output() amountChange = new EventEmitter<number>();
    @Output() currencyChange = new EventEmitter<string>();

    onChange: any = () => { };
    onTouched: any = () => { };

    writeValue(value: any): void {
        if (value) {
            this.amount = parseFloat(value.amount.toFixed(2)); 
            this.selectedCurrency = value.selectedCurrency;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onAmountChange(event: any) {
        let value = parseFloat(event.target.value);
        value = isNaN(value) ? 0 : parseFloat(value.toFixed(2));
        this.amountChange.emit(value);
        this.onChange({ amount: value, selectedCurrency: this.selectedCurrency });
    }

    onCurrencyChange(event: any) {
        const value = event.target.value;
        this.currencyChange.emit(value);
        this.onChange({ amount: this.amount, selectedCurrency: value });
    }
}
