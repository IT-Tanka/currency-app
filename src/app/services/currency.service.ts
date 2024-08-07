import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICurrency } from '../models/currency';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    private apiUrl = '/api/p24api/pubinfo?exchange&coursid=5';

    constructor(private http: HttpClient) { }

    getAll(): Observable<ICurrency[]> {
        return this.http.get<ICurrency[]>(this.apiUrl);
    }
}