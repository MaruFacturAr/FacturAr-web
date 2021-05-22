import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-modal',
    templateUrl: './app-modal.component.html'
})
export class AppModalComponent implements OnInit {
    public active: boolean = false;
    public body: string;
    public title: string;
    public onClose: Subject<boolean>;
    public inputValue:string;
    public confirmLabel:string;
    public cancelLabel:string;
    @Input() showModoPago:boolean = true;

    public constructor(
        private _bsModalRef: BsModalRef
    ) { }

    public ngOnInit(): void {
        this.onClose = new Subject();
    }
    //onKey(event) {this.inputValue = event.target.value;}
    public showConfirmationModal(title: string, body: string): void {
        this.title = title;
        this.body =  body;
        
        this.active = true;
    }

    public onConfirm(): void {
        this.active = false;
        this.onClose.next(true);
        this._bsModalRef.hide();
    }

    public onCancel(): void {
        this.active = false;
        this.onClose.next(false);
        this._bsModalRef.hide();
    }

    public hideModal(): void {
        this.active = false;
        this.onClose.next(null);
        this._bsModalRef.hide();
    }
}