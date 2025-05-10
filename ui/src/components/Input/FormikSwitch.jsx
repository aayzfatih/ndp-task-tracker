import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import Object from '../../utilities/Object';

const FormikSwitch = ({
  label = null,
  required = false,
  formik,
  id,
  disabled = false,
  className = '',
  wrapperClassName = '',
}) => (
  <div className={`${wrapperClassName}`}>
    {label && (
      <Label for={id} className="pb-0">
        {label}
        {required && (<span className="text-danger"> *</span>)}
      </Label>
    )}
    <Switch
      id={id}
      className={`${className}`}
      disabled={disabled}
      onChange={() => formik.setFieldValue(id, !Object.GetNestedValue(formik.values, id))}
      checked={Object.GetNestedValue(formik.values, id)}
    />
    {(Object.GetNestedValue(formik.errors, id) && Object.GetNestedValue(formik.touched, id))
      && (
        <div className="fv-plugins-message-container">
          <span role="alert" className="text-danger">{Object.GetNestedValue(formik.errors, id)}</span>
        </div>
      )}
  </div>
);

FormikSwitch.propTypes = {
  formik: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.object,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  wrapperClassName: PropTypes.string,
};

// FormikSwitch.defaultProps = {
//   label: null,
//   required: false,
//   className: '',
//   disabled: false,
//   wrapperClassName: '',
// };

export default FormikSwitch;
