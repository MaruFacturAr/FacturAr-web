import { Deserializable } from "app/interfaces/deserializable.model";

export class Item implements Deserializable{
    alternative_code: string;
    code: string;
    company_id: number;
    created_date: Date;
    currency_id: number;
    description: string;
    id: number;
    item_type_id: number;
    modified_date: Date;
    name: string;
    price: number;
    status_id: number;
    userId: number;
    
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}