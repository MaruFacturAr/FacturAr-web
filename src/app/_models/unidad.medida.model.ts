import { Deserializable } from 'app/interfaces/deserializable.model';

export class UnidadMedidaModel implements Deserializable {
    
    id: number;
    codigo: string;
    descripcion: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
