import { Deserializable } from "app/interfaces/deserializable.model";

export class Phone implements Deserializable {
  
    city_code: number;
    country_code: string;
    extension: string;
    number: string;
    phone_type_id: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}