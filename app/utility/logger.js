import Bugsnag from '@bugsnag/expo';

const log = (error) => {
  Bugsnag.notify(error);
  console.log(error);
};

const start = () => Bugsnag.start();

export default { log, start };
