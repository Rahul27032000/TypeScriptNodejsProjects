import { User } from "./authentication";
import { MessageResponse } from "./messageResponse";

export interface UserResponse extends MessageResponse {
  user?: User;
}
