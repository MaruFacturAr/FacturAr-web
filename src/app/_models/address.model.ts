import { Deserializable } from "app/interfaces/deserializable.model";

export class Address implements Deserializable {
    
    address_type_id: number;
    city: string;
    country_id: number;
    id: number;
    province_id: number;
    street: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
