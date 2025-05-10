/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import clsx from 'clsx';
import { NumericFormat } from 'react-number-format';
import Object from '../../utilities/Object';

const FormikInput = ({
  label = null,
  required = false,
  formik,
  id,
  name = null,
  placeholder = null,
  className = '',
  autoComplete = 'false',
  type = 'text',
  style = null,
  disabled = false,
  defaultErrorMessage = false,
  wrapperClassName = '',
  multiple = false,
  useNumberFormat = false,
  numberFormatProps = {},
}) => (
  <div className={wrapperClassName}>
    {label && (
      <Label for={id}>
        {label}
        {required && (<span className="text-danger"> *</span>)}
      </Label>
    )}
    {useNumberFormat ? (
      <NumericFormat
        id={id}
        name={name || id}
        inputid={id}
        placeholder={placeholder}
        className={required ? clsx('form-control', className, {
          'is-invalid': Object.GetNestedValue(formik.touched, id) && Object.GetNestedValue(formik.errors, id),
        }, {
          'is-valid': Object.GetNestedValue(formik.touched, id) && !Object.GetNestedValue(formik.errors, id),
        }) : clsx('form-control', className)}
        value={Object.GetNestedValue(formik.values, id)}
        onValueChange={values => {
          const { value } = values;
          if (value < 0) {
            formik.setFieldValue(id, 0);
          } else {
            formik.setFieldValue(id, value);
          }
        }}
        autoComplete={autoComplete}
        style={style}
        disabled={disabled}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...numberFormatProps}
      />
    ) : (
      <Input
        id={id}
        name={name || id}
        inputid={id}
        placeholder={placeholder}
        multiple={multiple}
        className={required ? clsx(className, {
          'is-invalid': Object.GetNestedValue(formik.touched, id) && Object.GetNestedValue(formik.errors, id),
        }, {
          'is-valid': Object.GetNestedValue(formik.touched, id) && !Object.GetNestedValue(formik.errors, id),
        }) : className}
        value={Object.GetNestedValue(formik.values, id)}
        onChange={option => formik.setFieldValue(id, option.target.value)}
        autoComplete={autoComplete}
        type={type}
        style={style}
        disabled={disabled}
      />
    )}

    {(Object.GetNestedValue(formik.errors, id) && (defaultErrorMessage || Object.GetNestedValue(formik.touched, id)))
      && (
        <div className="fv-plugins-message-container">
          <span role="alert" className="text-danger">{Object.GetNestedValue(formik.errors, id)}</span>
        </div>
      )}
  </div>
);

FormikInput.propTypes = {
  formik: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.object,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'number',
    'password',
    'date',
    'email',
    'tel',
    'url',
    'search',
    'textarea',
  ]),
  style: PropTypes.object,
  disabled: PropTypes.bool,
  defaultErrorMessage: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  multiple: PropTypes.bool,
  useNumberFormat: PropTypes.bool,
  numberFormatProps: PropTypes.object,
};

// FormikInput.defaultProps = {
//   label: null,
//   required: false,
//   name: null,
//   placeholder: null,
//   className: '',
//   autoComplete: 'false',
//   type: 'text',
//   style: null,
//   disabled: false,
//   defaultErrorMessage: false,
//   wrapperClassName: '',
//   // multiple: false,
// };

export default FormikInput;
