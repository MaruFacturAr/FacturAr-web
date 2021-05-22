import { animation, trigger, animateChild, group, transition, animate, style, query, state } from '@angular/animations';
  
export const CMXAnimations = [
    trigger('showHideFormBusqueda', [
        state('show', style({ })),
        state('collapse', style({
            height: '0',
            opacity: 0,
            overflow: 'hidden'
        })),
        transition('show <=> collapse', [
            animate('0.5s')
        ])
    ]),
    trigger('showHideContent', [
        transition(':enter', [
            animate('0.5s', style({ opacity:1 })),
          ]),
          transition(':leave', [
            animate('0.5s', style({ opacity: 0 }))
          ])
    ]),
    trigger('showHideInfo', [
        transition(':enter', [
            style({opacity:0, height:'*', transform:'translateY(-50px)' }),
            animate('0.5s')
        ]),
        transition(':leave', [
            animate('.5s', style({ height: 0, opacity:0, overflow:'hidden',transform:'translateY(-50px)' }))
        ])
    ]),
    trigger('showHideGuiasOperacion', [
        transition(':enter', [
            style({opacity:0, height:'*', transform:'translateY(-25px)' }),
            animate('0.2s')
        ]),
        transition(':leave', [
            animate('.2s', style({ height: 0, opacity:0, overflow:'hidden',transform:'translateY(-25px)' }))
        ])
    ]),
    trigger('dashboardBars', [
        transition(':enter', [
            style({opacity:0, height:0 }),
            animate('2s')
        ])
    ]),
    trigger('showHideDeclaInfo', [
        state('initial', style({
          height: '*'
        })),
        state('final', style({
            height: 0,
            overflow:'hidden'
        })),
        transition('final=>initial', animate('500ms ease-in')),
        transition('initial=>final', animate('500ms ease-out'))
      ]),
]
