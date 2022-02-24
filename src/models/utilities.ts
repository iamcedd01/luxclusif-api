import { SchemaOptions } from 'mongoose';

export const DefaultSchemaOptions: SchemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
};
