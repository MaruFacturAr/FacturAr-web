import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[numeric]'
})

export class NumericDirective {

    @Input('numericType') numericType: string; // number | decimal

    private regex = {
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    };

    private specialKeys = {
        number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', 'Control', 'v' ],
        decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', 'Control', 'v' ],
    };

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {

        if(event.key){
            if (this.specialKeys[this.numericType].indexOf(event.key) !== -1) {
                return;
            }
            // Do not use event.keycode this is deprecated.
            // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
            let current: string = this.el.nativeElement.value;
            let next: string = current.concat(event.key);
            if (next && !String(next).match(this.regex[this.numericType])) {
                event.preventDefault();
            }

        } else {

            if ([46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+C
            (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+V
            (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+X
            (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
              // let it happen, don't do anything
              return;
            }
            // Ensure that it is a number and stop the keypress
            if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    }
}