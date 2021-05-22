import { Deserializable } from "app/interfaces/deserializable.model";
import { Address } from "./address.model";
import { Phone } from "./phone.model";

export class User implements Deserializable{

    address: Address;
        created_date: Date;
        email: string;
        id: number;
        last_name: string;
        modified_date: Date;
        name: string;
        password: string;
        phone: Phone;
        salt: string;
        status_id: number;
        userName: string;

     deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}