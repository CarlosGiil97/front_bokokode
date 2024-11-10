import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartProduct {
    id: string;
    name: string;
    price: number;
    image: {
        src: string;
        alt: string;
    };
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private readonly CART_STORAGE_KEY = 'cart_items';
    private cartItems = new BehaviorSubject<CartProduct[]>([]);
    private isCartVisible = new BehaviorSubject<boolean>(false);

    cartItems$ = this.cartItems.asObservable();
    isCartVisible$ = this.isCartVisible.asObservable();

    constructor() {
        const savedItems = localStorage.getItem(this.CART_STORAGE_KEY);
        if (savedItems) {
            this.cartItems.next(JSON.parse(savedItems));
        }
    }

    addToCart(product: CartProduct) {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            product.quantity = 1;
            currentItems.push(product);
        }
        this.cartItems.next(currentItems);
        this.saveToLocalStorage(currentItems);
        this.showCart();

        console.log('Product added to cart:', currentItems);
    }

    removeItem(productId: string) {
        const currentItems = this.cartItems.value;
        const itemToRemove = currentItems.find(item => item.id === productId);

        if (itemToRemove) {
            if (itemToRemove.quantity > 1) {
                itemToRemove.quantity--;
            } else {
                const updatedItems = currentItems.filter(item => item.id !== productId);
                this.cartItems.next(updatedItems);
            }
            this.saveToLocalStorage(currentItems);

            if (currentItems.length === 0) {
                this.hideCart();
            }
        }
    }

    clearCart() {
        this.cartItems.next([]);
        localStorage.removeItem(this.CART_STORAGE_KEY);
        this.hideCart();
    }

    showCart() {
        this.isCartVisible.next(true);
    }

    hideCart() {
        this.isCartVisible.next(false);
    }

    toggleCart() {
        this.isCartVisible.next(!this.isCartVisible.value);
    }


    private saveToLocalStorage(items: CartProduct[]) {
        localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
    }

    getTotalItems(items: CartProduct[]): number {
        return items.reduce((total, item) => total + item.quantity, 0);
    }
}