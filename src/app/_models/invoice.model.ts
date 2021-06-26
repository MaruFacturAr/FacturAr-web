import { Deserializable } from "app/interfaces/deserializable.model";
import { InvoiceItem } from "./invoice.item.model";

export class Invoice implements Deserializable {
    amount_net: number;
    amount_op_ex: number;
    cae: string;
    cae_expiration_date: Date;
    company_id: number;
    counterfoils_id: number;
    created_date: Date;
    currencyId: number;
    customer_id: number;
    emision_date: Date;
    expiration_date: Date;
    id: number;
    invoiceItemList: InvoiceItem[];
    invoice_status_type_id: number;
    letter: String;
    number: number;
    observations: string;
    sale_condition_id: number;
    sale_point_id: number;
    service_date_from: Date;
    service_date_to: Date;
    total_amount: number;
    total_amount_conc: number;
    total_ivas: number;
    total_records: number;
    total_taxes: number;
    userId: number;
    voucher_id: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}