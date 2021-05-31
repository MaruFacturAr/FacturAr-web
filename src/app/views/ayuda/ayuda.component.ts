import { Component, ViewChild, ElementRef} from '@angular/core';


@Component({
  templateUrl: 'ayuda.component.html'
})

export class AyudaComponent {

@ViewChild('video' , {static: false}) video: ElementRef;

playVideo() {

    this.video.nativeElement.load();
    this.video.nativeElement.play();
  }


 }