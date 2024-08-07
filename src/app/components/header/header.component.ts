import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [CommonModule] 
})
export class HeaderComponent {
    title: string = 'Currency-App';
    @Input() usdRate: number | null = null;
    @Input() eurRate: number | null = null;
}
