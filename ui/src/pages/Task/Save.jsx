import React, { useEffect, useState } from 'react'
import { Form, Formik, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import MethodHelper from '../../Utilities/MethodHelper';
import FormikInput from '../../components/Input/FormikInput';
import FormikSelect from '../../components/Input/FormikSelect';
import FormikDatePicker from '../../components/Input/FormikDatePicker';
import Notify from '../../Utilities/Notify';
import Task from '../../services/Task';
import { Button } from 'reactstrap';
import { format } from 'date-fns';
import { CreateTaskSchema } from './validation';

const SaveTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [selectList, setSelectList] = useState({
    userList: null,
    stateList: null,
    priorityList: null,
  });

  const isUpdatePage = taskId && MethodHelper.isNumberic(taskId) && Number(taskId) > 0;

  const createTask = async (values) => {
    const postData = {
      ...values,
      taskStateId: values.taskState?.value,
      assignedUserId: values.assignedUserId?.value,
      priorityId: values.priority?.value,
    };
    const response = await Task.create(postData);
    if (response.status !== 200 || response.error) {
      Notify.error(response.message);
      return;
    }
    Notify.success('Görev başarıyla eklendi!');
    await MethodHelper.delayWithoutLoading(3000);
    navigate('/task');
  };
  const updateTask = async (values) => {
    const postData = {
      ...values,
      taskId,
      taskStateId: values.taskState?.value,
      assignedUserId: values.assignedUserId?.value,
      priorityId: values.priority?.value,
    };
    const response = await Task.update(postData);
    if (response.status !== 200 || response.error) {
      Notify.error(response.message);
      return;
    }
    Notify.success('Görev başarıyla güncellendi!');
    await MethodHelper.delayWithoutLoading(3000);
    navigate('/task');
  };


  const formik = useFormik({
    validationSchema: CreateTaskSchema,
    initialValues: {
      taskTitle: '',
      description: '',
      taskStateId: null,
      assignedUserId: null,
      priorityId: null,
      startdate: null,
      endDate: null,
    },
    onSubmit: (values) => {
      if (isUpdatePage) {
        updateTask(values);
      } else {
        createTask(values);
      }
    }
  });

  const getSelectList = async () => {
    const response = await Task.getSelectList();
    if (response.status !== 200 || response.error) {
      Notify.error(response.message);
      return;
    }
    setSelectList({
      userList: response.data.selectUserList,
      stateList: response.data.stateList,
      priorityList: response.data.priorityList,
    });
  };

  const getTask = async () => {
    const response = await Task.getTaskDetail(taskId);
    if (response.status !== 200 || response.error) {
      Notify.error(response.message);
      return;
    }
    formik.setValues({
      taskTitle: response.data.taskTitle,
      description: response.data.description,
      startdate: format(new Date(response.data.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(response.data.endDate), 'yyyy-MM-dd'),
      taskStateId: selectList.stateList.find(x => x.value === response.data.taskStateId),
      assignedUserId: selectList.userList.find(x => x.value === response.data.assignedUserId),
      priorityId: selectList.priorityList.find(x => x.value === response.data.priorityId),
    })
  };

  useEffect(() => {
    if (isUpdatePage && selectList) {
      getTask();
    }
  }, [isUpdatePage, selectList]);


  useEffect(() => {
    getSelectList();
  }, []);


  const wrapperClassName = 'col-md-6 mb-6';
  return (
    <div className='min-h-[80vh] flex items-start justify-center  pt-16'>
      <div className='w-2/3 max-w-8xl p-8 bg-white rounded-xl shadow-lg'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800'>Görev Ekle</h1>
        <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form initialValues={formik.initialValues} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <div className="row justify-content-start">
              <FormikInput
                id="taskTitle"
                formik={formik}
                label="Görev Başlığı"
                disabled={isUpdatePage}
                required
                wrapperClassName={wrapperClassName}
              />
              <FormikInput
                id="description"
                formik={formik}
                label="Açıklama"
                disabled={isUpdatePage}
                required
                wrapperClassName={wrapperClassName}
              />
              <FormikSelect
                id="assignedUserId"
                formik={formik}
                label="Atanacak Kişi"
                options={selectList.userList}
                disabled={isUpdatePage}
                required
                wrapperClassName={wrapperClassName}
              />
              <FormikSelect
                id="taskStateId"
                formik={formik}
                label="Görev Durumu"
                options={selectList.stateList}
                required
                wrapperClassName={wrapperClassName}
              />
              <FormikSelect
                id="priorityId"
                formik={formik}
                label="Öncelik Durumu"
                options={selectList.priorityList}
                disabled={isUpdatePage}
                required
                wrapperClassName={wrapperClassName}
              />
              <div className="row justify-content-start col-md-6 mb-6">
                <FormikDatePicker
                  id="startdate"
                  formik={formik}
                  label="Başlangıç Tarihi"
                  disabled={isUpdatePage}
                  required
                  wrapperClassName={wrapperClassName}
                />
                <FormikDatePicker
                  id="endDate"
                  formik={formik}
                  label="Bitiş Tarihi"
                  disabled={isUpdatePage}
                  required
                  wrapperClassName={wrapperClassName}
                />
              </div>
              <div className="flex justify-end mt-4">
              </div>
              <Button onClick={() => navigate('/task')} className="mr-2" color="secondary">
                İptal
              </Button>

              <Button type="submit" color="primary">
                {isUpdatePage ? 'Güncelle' : 'Ekle'}
              </Button>

            </div>
          </Form>
        </Formik>

      </div>
    </div >

  )
}

export default SaveTask
