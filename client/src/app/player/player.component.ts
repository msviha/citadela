import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerService} from "./player.service";
import {GameService} from "../game/game.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: PlayerService, useClass: PlayerService }
  ]
})
export class PlayerComponent implements OnInit {

  @Input()
  set player(p:any) {
    this._player = p;
    this.playerChangeSubscription && this.playerChangeSubscription.unsubscribe();
    this.playerChangeSubscription = this.player.playerChange.subscribe(() => {
      this.updatePlayer()
    });
    this.updatePlayer();
  }
  get player():any {
    return this._player;
  }
  _player:any;

  playerChangeSubscription:Subscription;

  playerName = '';

  constructor(public playerService:PlayerService, public gameService:GameService) {
  }

  ngOnInit() {
  }

  updatePlayer() {
    //todo update props
    this.playerName = this.player.playerName;
    this.playerService.indicators[0].show = this.player.crown;
  }
}
