import {WebsocketEvent} from './websocket-event.enum';

export interface WebsocketMessage {
  type: WebsocketEvent;
  data: any;
}
