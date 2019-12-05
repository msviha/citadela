import { Component } from '@angular/core';
import {CharEnum} from '../../citadela.types';
import {GameService} from '../game.service';
import {characters} from '../../citadela.characters';


@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss']
})
export class DraftComponent {

  draftPosition = 1;

  characters = characters;

  cards:CharEnum[] = [];

  constructor(public gameService:GameService) {
    this.prepareDraftPosition();
  }

  prepareDraftPosition() {
    if (this.draftPosition > 9) {
      return;
    }

    this.cards.splice(0);

    for (const char in characters) {
      if (characters.hasOwnProperty(char)) {
        characters[char].position === this.draftPosition && this.cards.push(<CharEnum>char);
      }
    }
  }

  pick(char:CharEnum) {
    this.gameService.room.send({play: {heroPick: char}});
    this.draftPosition++;
    this.prepareDraftPosition();
  }

}
