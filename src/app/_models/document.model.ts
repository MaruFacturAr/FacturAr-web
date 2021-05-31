import { Deserializable } from "app/interfaces/deserializable.model";

export class Document implements Deserializable {

    country_id: number;
    document_type_id: number;
    id: number;
    number: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
