import Environment from '../utilities/Environment';

const Api = {
  local: {
    taskTrackerService: 'https://localhost:7223',
  },
  getBaseUrl: service => {
    const environment = Environment.getEnvironment();
    return Api[environment][service];
  },
  // getUrl: (service, endpoint) => Api.getBaseUrl(service).concat(endpoint),
};

export default Api;