import {Component, OnInit} from '@angular/core';

import {Message} from "@stomp/stompjs";
import {RxStompService} from "../../../projects/chat/src/lib/rx-stomp-service.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  players: string[];
  private stomp:RxStompService;
  private gameCode:string


  constructor(stomp: RxStompService) {
    this.stomp = stomp;
    this.players = [];
    this.gameCode = ""
  }

  onJoin(gamecode:string, playerName:string){

    this.gameCode = gamecode;
    this.stomp.watch("/topic/game/"+this.gameCode, {playerName:playerName}).subscribe((message: Message) => {

      let body;
      try {

        body = JSON.parse(message.body)
        console.log(JSON.stringify(body))
      }catch (e){

        body = message.body
        this.players.push(body)
      }
    })
  }

  ngOnInit(): void {
  //  Empty because it's needed fo onInit later
  }
}