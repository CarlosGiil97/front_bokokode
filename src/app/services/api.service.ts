import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl = environment.apiUrl;

    constructor() {
        axios.defaults.baseURL = this.baseUrl;

        if (!environment.production) {
            axios.interceptors.request.use(request => {
                return request;
            });

            axios.interceptors.response.use(response => {
                return response;
            });
        }
    }

    async getProducts(page: number = 1, limit: number = 6) {
        try {
            const response = await axios.get(`/products`, {
                params: {
                    page,
                    limit
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async filterProducts(
        categories: string[],
        sort: { key: string; type: string } = { key: 'price', type: 'ASC' },
        page: number = 1,
        limit: number = 6
    ) {
        try {
            const response = await axios.post(`/products/filter?page=${page}&limit=${limit}`, {
                categories,
                sort
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getCategories() {
        try {
            const response = await axios.get('/categories?noPagination=true');
            return response.data;
        } catch (error) {
            throw error;
        }
    }


}