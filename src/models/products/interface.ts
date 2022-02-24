import { Document } from 'mongoose';

export interface IProductOption {
    name: string;
    values: Array<string>;
}

export interface IProduct {
    sku?: string;
    name: string;
    brand: string;
    category: string;
    description?: string;

    options: IProductOption[];
}

export interface IProductModel extends IProduct, Document {}

export type IProductCreate = IProduct;

export type IProductUpdate = IProduct & {
    id: string;
};

// RESPONSES

export type ProductSearchResponse = {
    total_count: number;
    products: IProductModel[];
};
