import {Subscriptions} from "../enums/subscriptions";
import {Levels} from "../enums/levels";

export interface User {
  id: number
  username:string
  name: string
  email: string
  subscription: Subscriptions
  level:Levels
  pictureUrl : string

}
