// import { Injectable } from '@angular/core'
// import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
// import { catchError, delay, Observable, retry, tap, throwError } from 'rxjs'
// import { ICurrency } from '../models/currency'
// import { ErrorService } from './error.service'

// @Injectable({
//     providedIn: 'root'
// })
// export class CurrencyService {
//     constructor(
//         private http: HttpClient,
//         // private errorService: ErrorService
//     ) {
//     }

//     currencies: ICurrency[] = []

//     getAll(): Observable<ICurrency[]> {
//         return this.http.get<ICurrency[]>('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5', {
//             params: new HttpParams({
//                 fromObject: { limit: 5 }
//             })
//         }).pipe(
//             delay(200),
//             retry(2),
//             tap(currencies => this.currencies = currencies),
// catchError(this.errorHandler.bind(this))
//     )
// }

// create(product: IProduct): Observable<IProduct> {
//     return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
//         .pipe(
//             tap(prod => this.products.push(prod))
//         )
// }


// private errorHandler(error: HttpErrorResponse) {
//     this.errorService.handle(error.message)
//     return throwError(() => error.message)
// }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class CurrencyService {
//     private apiUrl = '/api/p24api/pubinfo?exchange&coursid=5';

//     constructor(private http: HttpClient) { }

//     getAll(): Observable<any> {
//         return this.http.get(this.apiUrl);
//     }
// }

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
