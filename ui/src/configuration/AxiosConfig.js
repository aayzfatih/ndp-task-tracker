import axios from 'axios';
import { loaderRef } from '../components/general/Loader';
import Api from './Api';
import Environment from '../constants/Environment';

const RequestService = axios.create({
  baseURL: Api.getBaseUrl(Environment.Services.taskTrackerService),
});

RequestService.defaults.headers.head['Content-Type'] = 'application/json';
RequestService.defaults.validateStatus = status => status < 500;

RequestService.interceptors.response.use(
  response => {
    loaderRef.current.decLoader();
 
    return {
      ...response,
      message: response?.data?.message,
      error: response?.data?.error,
      data: response?.data?.data || response?.data?.Result,
      statusCode: response?.data?.statusCode,
    };
  },
  error => {
    console.log('Error', error);
    loaderRef.current.decLoader();
    if (error.status === 403) return { error: true, message: 'Bu işlemi yapmak için yetkiniz bulunmamaktadır.' };
    return error?.response?.data ?? undefined;
    // Promise.reject(error);
  },
  RequestService.interceptors.request.use(
    request => {
      loaderRef.current.incLoader();
      return request;
    },
    error => {
      loaderRef.current.decLoader();
      Promise.reject(error);
    },
  ),
);

export default RequestService;
