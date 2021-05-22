import { Deserializable } from 'app/interfaces/deserializable.model';

export class MonedaModel implements Deserializable {
    
    id: string;
    codigo: string;
    descripcion: number;
    moneda:string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
