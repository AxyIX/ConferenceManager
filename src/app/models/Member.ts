import {PhoneState} from './PhoneState';

export interface Member {
  id: number;
  name: string;
  active: boolean;
  phoneState: PhoneState;
}
