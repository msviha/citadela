import { Component } from '@angular/core';
import {CharEnum} from '../../citadela.types';
import {characters} from '../../citadela.characters';
import {GameService} from '../game.service';

@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.scss']
})
export class PickComponent {

  positionToPick = 1;

  characters = characters;

  cards:CharEnum[] = [];

  constructor(public gameService:GameService) {
    this.prepareCardsForPick();
  }

  prepareCardsForPick() {
    if (this.positionToPick > 9) {
      return;
    }

    this.cards.splice(0);

    for (const char in characters) {
      if (characters.hasOwnProperty(char)) {
        characters[char].position === this.positionToPick && this.cards.push(<CharEnum>char);
      }
    }
  }

  pick(char:CharEnum) {
    console.log(char);
    this.gameService.room.send({play: {heroPick: char}});
    this.positionToPick++;
    this.prepareCardsForPick();
  }
}
