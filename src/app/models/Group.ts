import {Member} from './Member';

export interface Group {
  id: number;
  name: string;
  members: Member[];
}
