import { Component, OnInit } from '@angular/core';
import {GameService, Phase} from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pick = 0;
  Phase = Phase;

  constructor(public gameService:GameService) { }

  ngOnInit() {
  }
  processPick(n:number) {

  }

}
