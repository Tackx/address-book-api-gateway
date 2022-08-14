import { Request, Response } from 'express';
import { WelcomeMessage } from '../interfaces/message.interface';
import { DefaultRouteConfig } from '../config';

export class DefaultController {
  public static welcomeMessage(req: Request, res: Response) {
    const welcomeMessage: WelcomeMessage = {
      message: DefaultRouteConfig.params.message,
      repository: DefaultRouteConfig.params.repository,
      version: <string>process.env.npm_package_version
    };

    return res.status(200).json(welcomeMessage);
  }
}
