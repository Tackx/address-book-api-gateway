import app from './app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = process.env;

let appPort: string;

if (<string>config.NODE_ENV === 'production') {
  appPort = <string>process.env.PORT || <string>config.PROD_PORT;
} else {
  appPort = <string>process.env.PORT || <string>config.DEV_PORT;
}

// Start API server
app.listen(appPort, () => {
  console.log(`Gateway Service Server started on port ${appPort}`);
});
