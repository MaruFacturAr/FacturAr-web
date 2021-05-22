import { Deserializable } from 'app/interfaces/deserializable.model';

export class PaisAfipModel implements Deserializable {

    descripcion: string;
    idnsPais: number;

    constructor () { }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
