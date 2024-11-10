import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-featured-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-product.component.html',
  styles: [`
    :host {
      display: block;
      margin-bottom: 2rem;
    }
  `]
})
export class FeaturedProductComponent implements OnInit {
  featuredProduct: any = null;
  relatedProducts: any[] = [];
  products: any[] = [];
  loading = true;
  error = false;

  constructor(private apiService: ApiService,
    private cartService: CartService) { }

  async ngOnInit() {
    try {
      const dataProducts = await this.apiService.getProducts();
      this.products = dataProducts.data;
      this.featuredProduct = this.products.find((p: any) => p.featured);

      this.loading = false;
    } catch (err) {
      this.error = true;
      this.loading = false;
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}