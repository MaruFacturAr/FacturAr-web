import { Deserializable } from "app/interfaces/deserializable.model";

export class InvoiceItemTax implements Deserializable{
    aliquot: number;
    amount: number;
    base_amount: number;
    id: number;
    tax_type_id: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}