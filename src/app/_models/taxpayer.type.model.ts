import { Deserializable } from "app/interfaces/deserializable.model";

export class TaxpayerType implements Deserializable{

    id: number;
    afip_code: number;
    name: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}