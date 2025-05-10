import Constants from '../constants';

const Environment = {
  getEnvironment: () => {
      return Constants.Environment.Type.local;     
  },
  isLocal: () => Environment.getEnvironment() === Constants.Environment.Type.local,
};

export default Environment;