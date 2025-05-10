import * as yup from 'yup';

const requiredErrorMessage = 'Bu alan zorunludur';

export const CreateTaskSchema= yup.object().shape({
  taskTitle: yup.string().required(requiredErrorMessage),
  description: yup.string().required(requiredErrorMessage),
  assignedUserId: yup.object().required(requiredErrorMessage),
  taskStateId: yup.object().required(requiredErrorMessage),
  priorityId: yup.object().required(requiredErrorMessage),
  startdate: yup.date().required(requiredErrorMessage),
  endDate: yup.date().required(requiredErrorMessage),  
});