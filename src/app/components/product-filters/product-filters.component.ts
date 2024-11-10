import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';


@Component({
    selector: 'app-product-filters',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './product-filters.component.html',
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProductFiltersComponent implements OnInit {
    categories: any[] = [];
    selectedCategories: string[] = [];
    products: any[] = [];
    filteredProducts: any[] = [];
    loading = true;
    showMobileFilters = false;
    meta: any = null;

    sortConfig = {
        key: 'price' as 'price' | 'name',
        type: 'ASC' as 'ASC' | 'DESC'
    };

    constructor(private apiService: ApiService,
        private cartService: CartService) { }

    get showPagination(): boolean {
        return this.meta?.total > this.meta?.per_page;
    }

    getPageArray(): number[] {
        if (!this.meta?.last_page) return [];
        return Array.from({ length: this.meta.last_page }, (_, i) => i + 1);
    }

    async ngOnInit() {
        try {
            const response = await this.apiService.getProducts();
            this.products = response.data;
            this.meta = response.meta;
            this.filteredProducts = [...this.products];

            const categoriesResponse = await this.apiService.getCategories();
            this.categories = categoriesResponse.data;

            this.loading = false;
        } catch (err) {
            console.error('Error in initialization:', err);
            this.loading = false;
        }
    }

    async applyFilters(page: number = 1) {
        this.loading = true;
        console.log(this.selectedCategories)
        try {
            if (this.selectedCategories.length > 0 ||
                this.sortConfig.key !== 'price' ||
                this.sortConfig.type !== 'ASC') {

                const response = await this.apiService.filterProducts(
                    this.selectedCategories,
                    {
                        key: this.sortConfig.key,
                        type: this.sortConfig.type
                    },
                    page
                );
                this.filteredProducts = response.data;
                this.meta = response.meta;
            } else {
                const response = await this.apiService.getProducts(page);
                this.filteredProducts = response.data;
                this.meta = response.meta;
            }
        } catch (err) {
            console.error('Error applying filters:', err);
        } finally {
            this.loading = false;
        }
    }

    async toggleCategory(categoryName: string) {
        const index = this.selectedCategories.indexOf(categoryName);
        if (index > -1) {
            this.selectedCategories.splice(index, 1);
        } else {
            this.selectedCategories.push(categoryName);
        }
        await this.applyFilters(1);
    }

    async onSortChange() {
        await this.applyFilters(1);
    }

    async toggleSortDirection() {
        this.sortConfig.type = this.sortConfig.type === 'ASC' ? 'DESC' : 'ASC';
        await this.applyFilters(1);
    }

    async changePage(page: number) {
        if (page >= 1 && page <= this.meta.last_page) {
            await this.applyFilters(page);
        }
    }

    clearFilters() {
        this.selectedCategories = [];
        this.sortConfig = {
            key: 'price',
            type: 'ASC'
        };
        this.applyFilters(1);
        this.showMobileFilters = false;
    }

    addToCart(product: any) {
        this.cartService.addToCart(product);
    }

    toggleMobileFilters() {
        this.showMobileFilters = !this.showMobileFilters;
    }


}