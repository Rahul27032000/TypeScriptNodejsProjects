export interface Authentication {
  password: string;
  sessionToken: string;
}

export interface User {
  username: string;
  email: string;
  authentication: Authentication;
}
