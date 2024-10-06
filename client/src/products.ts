export interface Product {
        id: number;
        name: string;
        description: string;
        price: number;
        type?: string;
        pictureUrl: string;
        brand: string;
        quantityInStock?: number;
}