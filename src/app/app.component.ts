import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ProductFiltersComponent,
    FeaturedProductComponent,
    CartComponent
  ],
  template: `
   <div class="bg-white min-h-screen">
      <header class="fixed top-0 left-0 right-0 bg-white z-50">
        <div class="max-w-[1440px] mx-auto">
          <div class="flex justify-between items-center py-4 px-4 md:px-6 border-b border-gray-200">
            <h1 class="text-2xl font-bold">BEJAMAS_</h1>
            <button class="relative" (click)="cartService.toggleCart()">
              <i class="fa-solid fa-cart-shopping text-2xl"></i>
              <span *ngIf="(cartService.cartItems$ | async)?.length" 
                    class="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {{ cartItemsCount$ | async }}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-[1440px] mx-auto px-4 md:px-6 pt-24">
        <app-featured-product></app-featured-product>
        <app-product-filters></app-product-filters>
      </main>

      <app-cart></app-cart>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f9fafb;
    }
  `]
})
export class AppComponent {
  cartItemsCount$: Observable<number>;

  constructor(public cartService: CartService) {
    this.cartItemsCount$ = this.cartService.cartItems$.pipe(
      map(items => items.length)
    );
  }
  title = 'bejamas-store';

}