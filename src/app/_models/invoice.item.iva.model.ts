import { Deserializable } from "app/interfaces/deserializable.model";

export class InvoiceItemIva implements Deserializable {
    amount: number;
    base_amount: number;
    id: number;
    iva_type_id: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}