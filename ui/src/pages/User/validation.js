import * as yup from 'yup';

const requiredErrorMessage = 'Bu alan zorunludur';

export const CreateSchema = yup.object().shape({
  name: yup.string().required(requiredErrorMessage),
  surname: yup.string().required(requiredErrorMessage),
  email: yup.string().email().required(requiredErrorMessage),
  phone: yup.string().required(requiredErrorMessage),
});