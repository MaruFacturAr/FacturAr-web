import { Deserializable } from "app/interfaces/deserializable.model";

export class ProvinceModel implements Deserializable{

    id: number;
    code: string;
    name: string;
    country_id: number;
   
    constructor () { }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}