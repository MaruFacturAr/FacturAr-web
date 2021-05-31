import { Deserializable } from "app/interfaces/deserializable.model";

export class DocumentType implements Deserializable{

    id: number;
    name: string;
    afip_code: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    
}