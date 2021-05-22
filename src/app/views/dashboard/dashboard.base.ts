import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

export class DashboardBase
{
    constructor(protected _spinner: NgxSpinnerService,
                protected _translateService: TranslateService) {
                  this._translateService.use('es');
                 }

    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
            categoryPercentage: 0.4,
            barPercentage: 1.0,
            minBarLength:10,
            gridLines: {
                offsetGridLines: true
            }
        }]
      }
    };

    barChartLabels:Array<string> = [];

    public showLoading(name) {
        setTimeout(() => {
          this._spinner.show(name,
            {
              type: 'line-scale',
              size: 'default',
              bdColor: 'rgba(74,74,74,0.4)',
              color: 'white',
              fullScreen: false
            }
          );  
        }, 250);
      }
    
    public hideLoading(name){
      setTimeout(() => {
        this._spinner.hide(name);
      }, 250);
    }
}