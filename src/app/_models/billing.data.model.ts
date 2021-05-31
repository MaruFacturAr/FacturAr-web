import { Deserializable } from "app/interfaces/deserializable.model";
import { Address } from "./address.model";
import { Document } from "./document.model";
import { Phone } from "./phone.model";

export class BillingData implements Deserializable {

    address: Address;
    document: Document;
    email: string;
    fantasy_name: string;
    id: number;
    legal_name: string;
    phone: Phone;
    taxpayer_type_id: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
