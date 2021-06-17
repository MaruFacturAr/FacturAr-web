import { Deserializable } from "app/interfaces/deserializable.model";

export class VoucherType implements Deserializable{

    afip_code: string;
    id: number;
    letter_id: number;
    name: string;
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}