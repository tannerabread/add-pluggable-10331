import { Amplify, Logger, AWSCloudWatchProvider } from 'aws-amplify';
import awsExports from '../aws-exports';

Amplify.configure({
  Logging: {
    logGroupName: 'amplify-logger',
    logStreamName: 'amplify-logger',
  },
  ...awsExports
})

const logger = new Logger('');
if (process.env.NODE_ENV === 'production') {
  Amplify.register(logger);
  console.log(logger, 'AMPLIFY LOGGER');
  logger.addPluggable(new AWSCloudWatchProvider());
}

export function customLogger (componentName) {
  return {
    debug: (message) => {
      logger.debug(componentName, message);
    },
    info: (message) => {
      logger.info(componentName, message);
    },
    warn: (message) => {
      logger.warn(componentName, message);
    },
    error: (message) => {
      logger.error(componentName, message);
    },
  };
}