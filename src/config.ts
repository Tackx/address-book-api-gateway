export abstract class LogConfig {
  public static params = {
    path: '../../logs',
    fileName: 'access.log',
    size: '10M',
    interval: '1d', // rotate once per day
    compress: 'gzip'
  };
}

export abstract class ProxyConfig {
  public static params = {
    prod: {
      url: {
        users: 'ab-api-users.herokuapp.com',
        contacts: 'ab-api-contacts.herokuapp.com',
        docs: 'ab-api-docs.herokuapp.com'
      }
    },
    dev: {
      url: {
        users: 'users',
        contacts: 'contacts',
        docs: 'docs'
      },
      port: {
        users: '3001',
        contacts: '4001',
        docs: '5001'
      }
    }
  };
}

export abstract class DefaultRouteConfig {
  public static params = {
    message: 'Welcome to the Address Book API.',
    repository: 'https://github.com/Tackx/address-book-api'
  };
}
