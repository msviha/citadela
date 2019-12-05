import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import {characters} from '../../citadela.characters';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  characters = characters;

  constructor(public gameService:GameService) { }

  ngOnInit() {
  }

}
