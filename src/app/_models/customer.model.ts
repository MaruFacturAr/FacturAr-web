import { Deserializable } from "app/interfaces/deserializable.model";
import { BillingData } from "./billing.data.model";

export class Customer implements Deserializable{

    billing_data_id: BillingData;
    company_id: number;
    id: number;
    status_id: number;
    userId: number;

       deserialize(input: any): this {
       Object.assign(this, input);
        return this;
    }

}