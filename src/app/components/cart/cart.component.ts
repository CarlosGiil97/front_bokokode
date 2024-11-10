import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart.component.html',
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class CartComponent {
    constructor(public cartService: CartService) { }

    calculateTotal(items: any[]): string {
        const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
        return total.toFixed(2);
    }
}