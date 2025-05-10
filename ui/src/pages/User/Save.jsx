import React, { useEffect } from 'react'
import { Form, Formik, useFormik } from 'formik';
import FormikInput from '../../components/Input/FormikInput';
import { useNavigate, useParams } from 'react-router-dom';
import MethodHelper from '../../Utilities/MethodHelper';
import { Button } from 'reactstrap';
import User from '../../services/User';
import Notify from '../../Utilities/Notify';
import { CreateSchema } from './validation';

const Save = () => {
  const { userId } = useParams();
  const isUpdatePage = userId && MethodHelper.isNumberic(userId) && Number(userId) > 0;
  const navigate = useNavigate()

  const createUser = async (values) => {
    const postData = {
      ...values,
    };
    const response = await User.create(postData);
    if (response.status !== 200 || response.error) {
      Notify.error(response.message);
      return;
    }
    Notify.success('Kullanıcı başarıyla eklendi!');
    await MethodHelper.delayWithoutLoading(3000);
    navigate('/users');

  };

  const updateUser = async (values) => {
    const postData = {
      ...values,
      userId,
    };
    const response = await User.update(postData);
    if (response.status !== 200 || response.error) {
      Notify.error(response.message);
      return;
    }
    Notify.success('Kullanıcı başarıyla güncellendi!');
    await MethodHelper.delayWithoutLoading(3000);
    navigate('/users');
  };

  const formik = useFormik({
    validationSchema: CreateSchema,
    initialValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
    },
    onSubmit: (values) => {
      if (isUpdatePage) {
        updateUser(values)
      } else {
        createUser(values)
      }
    },
  })

  const getUserDetail = async () => {
    const response = await User.getUserDetail(userId);
    if (response.status !== 200 || response.error) {
      Notify.error(response.message);
      return;
    }
    formik.setValues({
      name: response.data.name,
      surname: response.data.surname,
      email: response.data.email,
      phone: response.data.phone,
    });
  }

  useEffect(() => {
    if (isUpdatePage) {
      getUserDetail();
    }
  }, [isUpdatePage])

  const wrapperClassName = 'col-md-6 mb-6';
  return (
    <div className='min-h-[80vh] flex items-start justify-center  pt-16'>
      <div className='w-2/3 max-w-8xl p-8 bg-white rounded-xl shadow-lg'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800'>Kullanıcı Ekle</h1>
        <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form initialValues={formik.initialValues} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <div className="row justify-content-start">
              <FormikInput id="name" formik={formik} label="Ad" required wrapperClassName={wrapperClassName} />
              <FormikInput id="surname" formik={formik} label="Soyad" required wrapperClassName={wrapperClassName} />
              <FormikInput id="email" formik={formik} label="Email" disabled={isUpdatePage} required wrapperClassName={wrapperClassName} />
              <FormikInput id="phone" formik={formik} label="Telefon" required wrapperClassName={wrapperClassName} />
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => navigate('/users')} className="mr-2" color="secondary">
                İptal
              </Button>
              <Button type="submit" color="primary">
                {isUpdatePage ? 'Güncelle' : 'Ekle'}
              </Button>
            </div>
          </Form>
        </Formik>
      </div >
    </div >
  )




}

export default Save
