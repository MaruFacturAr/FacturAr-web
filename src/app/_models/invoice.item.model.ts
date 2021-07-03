import { Deserializable } from "app/interfaces/deserializable.model";
import { InvoiceItemIva } from "./invoice.item.iva.model";
import { InvoiceItemTax } from "./invoice.item.tax.model";

export class  InvoiceItem implements Deserializable {
    amount_item: number;
    amount_ivas: number;
    amount_op_ex: number;
    amount_taxes: number;
    id: number;
    invoice_id: number;
    invoiceItemIvaList: InvoiceItemIva[];
    invoiceItemTaxList: InvoiceItemTax[];
    item_id: number;
    quantity: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
