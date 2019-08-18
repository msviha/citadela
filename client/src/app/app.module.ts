import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule} from 'angular-bootstrap-md'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlayerComponent } from './player/player.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './board/board.component';
import { HeroComponent } from './player/hero/hero.component';
import { BuildingsComponent } from './player/buildings/buildings.component';
import { HandComponent } from './player/hand/hand.component';
import { OverviewComponent } from './player/overview/overview.component';
import { SeatComponent } from './game/seat/seat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    NavComponent,
    HomeComponent,
    PlayerComponent,
    GameComponent,
    BoardComponent,
    HeroComponent,
    BuildingsComponent,
    HandComponent,
    OverviewComponent,
    SeatComponent
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
export class AppModule { }
