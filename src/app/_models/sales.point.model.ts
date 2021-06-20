import { Deserializable } from "app/interfaces/deserializable.model";

export class SalesPoint implements Deserializable{

    afip_code: number;
        company_id: number;
        id: number;
        name: string;
        status_id: number;
        userId: number;

   deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}