import { Deserializable } from "app/interfaces/deserializable.model";

export class Counterfoil implements Deserializable{
    code: string;
        company_id: number;
        from_number: number;
        id: number;
        name: string;
        next_number: number;
        status_id: number;
        to_number: number;
        userId: number;
        voucher_type_id: number;

    deserialize(input: any): this {
       Object.assign(this, input);
        return this;
    }

}