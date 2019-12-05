import {Component, Input, OnInit} from '@angular/core';
import {PlayerService} from "../player.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input()
  playerName = 'player';

  constructor(public playerService:PlayerService) { }

  ngOnInit() {
  }

  itemClick(indicator:any) {
    this.playerService.setTabState(indicator);
  }
}
