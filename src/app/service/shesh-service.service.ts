import {Injectable} from '@angular/core';
import {IMessage, RxStomp} from "@stomp/rx-stomp";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SheshServiceService {

  private rxStomp = new RxStomp();
  private baseUrl = "ws://localhost:8080"
  private topicPath = "/topic/sesh"
  private stompconfig = {brokerURL: this.baseUrl + '/ws'}


  constructor() {

    this.rxStomp.configure(this.stompconfig)
    this.rxStomp.activate()
  }

  joinSesh(seshCode: string, playerName: string): Observable<IMessage> {

    const path = this.topicPath + "/" + seshCode
    const headers = {'playerName': playerName}

    const options = {destination: path, subHeaders: headers, headers: headers}
    return this.rxStomp.watch(options)
  }
}