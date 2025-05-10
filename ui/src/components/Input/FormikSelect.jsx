import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Object from '../../utilities/Object';

const baseSelect = React.createElement(Select);
const FormikSelect = ({ formik,
  label,
  id,
  name = null,
  className = null,
  inputId = null,
  required = false,
  placeholder = 'Select...',
  options,
  style = baseSelect.props.filterOption,
  isMulti = false,
  menuPosition = 'fixed',
  menuPlacement = 'bottom',
  filterOption = baseSelect.props.filterOption,
  styles = { menuPortal: base => ({ ...base, zIndex: 9999 }) },
  disabled = false,
  isClearable = false,
  defaultErrorMessage = false,
  onChangeValidation = null,
  wrapperClassName = '' }) => {
  const { i18n } = useTranslation();
  return (
    <div className={wrapperClassName}>
      {label && (
        <Label for={id}>
          {label}
          {required && (<span className="text-danger"> *</span>)}
        </Label>
      )}
      <Select
        id={id}
        name={name || id}
        classNamePrefix="react-select"
        className={required ? clsx(className, 'react-select', {
          'is-invalid border border-danger rounded': Object.GetNestedValue(formik.touched, id) && Object.GetNestedValue(formik.errors, id),
        }, {
          'is-valid border border-success rounded': Object.GetNestedValue(formik.touched, id) && !Object.GetNestedValue(formik.errors, id),
        }) : className}
        inputId={inputId || id}
        placeholder={placeholder}
        options={options}
        onChange={option => {
          try {
            if (onChangeValidation) onChangeValidation(option);
            formik.setFieldValue(id, option);
          } catch {
          }
        }}
        value={Object.GetNestedValue(formik.values, id)}
        locale={i18n.language}
        // required={required}
        style={style}
        isMulti={isMulti}
        menuPortalTarget={document.body}
        menuPosition={menuPosition}
        menuPlacement={menuPlacement}
        filterOption={filterOption}
        styles={styles}
        isDisabled={disabled}
        isClearable={isClearable}
      />
      {Object.GetNestedValue(formik.errors, id) && (defaultErrorMessage || Object.GetNestedValue(formik.touched, id))
        && (
          <div className="fv-plugins-message-container">
            <span role="alert" className="text-danger">{Object.GetNestedValue(formik.errors, id)}</span>
          </div>
        )}
    </div>
  );
};

FormikSelect.propTypes = {
  formik: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  name: PropTypes.string,
  inputId: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  menuPosition: PropTypes.string,
  menuPlacement: PropTypes.string,
  filterOption: PropTypes.func,
  styles: PropTypes.object,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  defaultErrorMessage: PropTypes.bool,
  onChangeValidation: PropTypes.func,
  wrapperClassName: PropTypes.string,
};

// FormikSelect.defaultProps = {
//   name: null,
//   inputId: null,
//   className: null,
//   placeholder: 'Select...',
//   style: baseSelect.props.style,
//   required: false,
//   isMulti: false,
//   label: null,
//   menuPosition: 'fixed',
//   menuPlacement: 'bottom',
//   filterOption: baseSelect.props.filterOption,
//   styles: { menuPortal: base => ({ ...base, zIndex: 9999 }) },
//   disabled: false,
//   isClearable: false,
//   defaultErrorMessage: false,
//   onChangeValidation: null,
//   wrapperClassName: '',
// };

export default FormikSelect;
