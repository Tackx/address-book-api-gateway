export interface Message {
  message: string;
}

export interface WelcomeMessage extends Message {
  message: string;
  repository: string;
  version: string;
}
