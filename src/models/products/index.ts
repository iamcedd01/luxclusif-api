import { Product } from './schema';
import { IProductCreate, IProductModel, IProductUpdate, ProductSearchResponse } from './interface';
import { isValidObjectId } from 'mongoose';

type SearchProductProps = {
    page?: number;
    limit?: number;
    sort_args?: any;
    search?: string;
    query_args?: any;
};

export const get_by_id = async (id: string): Promise<IProductModel> =>
    Promise.all([Product.findById(id)]).then(results => results[0] as IProductModel);

export const search_products = ({
    limit = 12,
    page = 1,
    search = '',
    sort_args = {},
    query_args = {},
}: SearchProductProps): Promise<ProductSearchResponse> => {
    const query: any = { ...query_args };

    if (search) {
        if (isValidObjectId(search)) {
            query.id = search;
        } else {
            query.$or = [
                { sku: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ];
        }
    }

    return Promise.all([
        Product.find(query)
            .limit(limit)
            .skip(limit * page - limit)
            .sort(sort_args)
            .exec(),
        Product.count(query),
    ]).then(results => {
        return {
            products: results[0],
            total_count: results[1],
        } as ProductSearchResponse;
    });
};

export const create_product = (data: IProductCreate) => {
    const new_product: IProductModel = new Product(data);
    return new_product.save().then((product: IProductModel) => product);
};

export const update_product = async ({ id, ...data }: IProductUpdate) => {
    const product = await Product.findById(id);

    return Product.findByIdAndUpdate(id, data);
};
