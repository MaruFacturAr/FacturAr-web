import { Deserializable } from "app/interfaces/deserializable.model";
import { BillingData } from "./billing.data.model";

export class Company implements Deserializable{

    billingData: BillingData;
    id: number;
    iibb_code: string;
    initial_date: Date;
    userId: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}