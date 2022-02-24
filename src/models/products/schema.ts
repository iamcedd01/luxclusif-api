import { model, Model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import uniqueValidator from 'mongoose-unique-validator';

import { IProductModel } from './interface';
import { DefaultSchemaOptions } from '../utilities';

const { String, Number } = Schema.Types;

const ProductSchema: Schema = new Schema(
    {
        sku: String,
        name: {
            type: String,
            required: true,
        },
        brand: String,
        category: String,
        description: String,
        media: Object,
        price: {
            default: 0,
            type: Number,
        },
        compare_at_price: Number,
        options: [
            {
                name: String,
                values: [String],
            },
        ],
    },
    { ...DefaultSchemaOptions }
);

ProductSchema.plugin(uniqueValidator, function () {
    return { message: `${this.name} is already taken.` };
});

ProductSchema.plugin(mongoosePaginate);

export const Product: Model<IProductModel> = model<IProductModel>('Product', ProductSchema);
