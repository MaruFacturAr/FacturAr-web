import { Deserializable } from "app/interfaces/deserializable.model";

export class Voucher implements Deserializable{

    company_id: number;
    counterfoil_id: number;
    id: number;
    name: string;
    sales_point_id: number;
    status_id: number;
    userId: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}