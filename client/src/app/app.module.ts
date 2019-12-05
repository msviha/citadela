import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GameComponent} from './game/game.component';
import {SeatComponent} from './game/seat/seat.component';
import {NavComponent} from './game/nav/nav.component';
import {BoardComponent} from './game/board/board.component';
import {PlayerComponent} from './game/player/player.component';
import {HeroComponent} from './game/player/hero/hero.component';
import {BuildingsComponent} from './game/player/buildings/buildings.component';
import {HandComponent} from './game/player/hand/hand.component';
import {OverviewComponent} from './game/player/overview/overview.component';
import { PickComponent } from './game/pick/pick.component';
import { DraftComponent } from './game/draft/draft.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PlayerComponent,
    GameComponent,
    BoardComponent,
    HeroComponent,
    BuildingsComponent,
    HandComponent,
    OverviewComponent,
    SeatComponent,
    PickComponent,
    DraftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
