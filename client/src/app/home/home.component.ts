import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  translate:string;

  @ViewChild('audioElement', {static: false}) audioElement:HTMLAudioElement;

  constructor() { }

  ngOnInit() {
  }

}
