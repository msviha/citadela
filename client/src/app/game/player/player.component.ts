import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PlayerService} from './player.service';
import {GameService, IPlayer} from '../game.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: PlayerService, useClass: PlayerService }
  ]
})
export class PlayerComponent {

  @Input()
  set player(p:IPlayer) {
    console.log(p);
    this._player = p;
    this.updatePlayer();
  }
  get player():IPlayer {
    return this._player;
  }
  _player:IPlayer;

  playerName = '';

  constructor(public playerService:PlayerService, public gameService:GameService) {
  }

  updatePlayer() {
    //todo update props
    this.playerName = this.player.name;
  }
}
