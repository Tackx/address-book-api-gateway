import express, { NextFunction, Request, Response } from 'express';
import defaultRoute from './routes/default.router';
import mongoSanitize from 'express-mongo-sanitize';
import { dataLimit, authLimit } from './utils/limiter';
import logger from './middleware/logger';
import proxy from 'express-http-proxy';
import { ProxyConfig } from './config';

const app = express();

app.use(mongoSanitize());
app.use(express.json());

app.use(logger('file'));
if (<string>process.env.NODE_ENV === 'production') {
  app.use(logger('console'));
} else {
  app.use(logger('dev'));
}

// Define microservice urls for communication/proxying
let usersUrl: string;
let contactsUrl: string;
let docsUrl: string;

if (<string>process.env.NODE_ENV === 'production') {
  usersUrl = ProxyConfig.params.prod.url.users;
  contactsUrl = ProxyConfig.params.prod.url.contacts;
  docsUrl = ProxyConfig.params.prod.url.docs;
} else {
  usersUrl = `${ProxyConfig.params.dev.url.users}:${ProxyConfig.params.dev.port.users}`;
  contactsUrl = `${ProxyConfig.params.dev.url.contacts}:${ProxyConfig.params.dev.port.contacts}`;
  docsUrl = `${ProxyConfig.params.dev.url.docs}:${ProxyConfig.params.dev.port.docs}`;
}

// Gateway routes and default route
app.use('/api/users', authLimit, proxy(usersUrl));
app.use('/api/security', authLimit, proxy(usersUrl));
app.use('/api/contacts', dataLimit, proxy(contactsUrl));
app.use('/api/docs/', dataLimit, proxy(docsUrl));
app.use('/api', dataLimit, defaultRoute);

// Root route redirects to /api default route
app.get('/', dataLimit, (req: Request, res: Response) => {
  res.redirect('/api');
});

// Error handling
app.all('*', dataLimit, (req: Request, res: Response) => {
  res.status(404).json({ message: 'Incorrect API path (gateway)' });
});

// Default error
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err.message) {
    err.message = 'Something went wrong';
  }
  if (!err.status) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).json(`${err.message}`);
});

export default app;
