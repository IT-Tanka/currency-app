import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from './components/header/header.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CurrencyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getAll().subscribe();
  }
}
