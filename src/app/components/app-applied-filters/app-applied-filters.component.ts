import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import { CMXConfig } from 'config/config.prod';

@Component({
    selector: "app-applied-filters",
    templateUrl: "app-applied-filters.component.html"
})

export class AppAppliedFiltersComponent implements OnInit {
    
    @Input() filterItems:Array<any>;
    @Input() isFirstSearch:Boolean;
    @Input() searchState:boolean;
    daysToSearchFirstTime: number;

    ngOnInit() {
        this.daysToSearchFirstTime = CMXConfig.general.initialSearch.daysToSearch;
    }
}