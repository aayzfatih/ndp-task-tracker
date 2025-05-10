import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Object from '../../utilities/Object';

const baseDatePicker = React.createElement(DatePicker);

const FormikDatePicker = ({
  formik,
  id,
  name = null,
  required = false,
  className = 'form-control',
  dateFormat = 'dd/MM/yyyy',
  selectsStart = baseDatePicker.props.selectsStart,
  selectsEnd = baseDatePicker.props.selectsEnd,
  startDate = baseDatePicker.props.startDate,
  endDate = baseDatePicker.props.endDate,
  minDate = baseDatePicker.props.minDate,
  maxDate = baseDatePicker.props.maxDate,
  popperPlacement = 'bottom-end',
  label = null,
  disabled = false,
  showTimeSelect = false,
  timeFormat = 'HH:mm',
  timeCaption = 'Saat',
  showMonthYearPicker = false,
  showFullMonthYearPicker = false,
  locale = 'tr',
  isClearable = false,
  wrapperClassName = '',
}) => {
  const [language, setLanguage] = useState(locale || 'tr');
  const { i18n, t: T } = useTranslation();

  useEffect(() => {
    if (i18n) {
      setLanguage(i18n.language);
    }
  }, [i18n.language]);
  return (
    <div className={wrapperClassName}>
      <div className="row">
        {label && (
          <Label for={id}>
            {label}
            {required && (<span className="text-danger"> *</span>)}
          </Label>
        )}
      </div>
      <DatePicker
        id={id}
        name={name}
        className={required ? clsx(className, {
          'is-invalid border border-danger rounded': Object.GetNestedValue(formik.touched, id) && Object.GetNestedValue(formik.errors, id),
        }, {
          'is-valid border border-success rounded': Object.GetNestedValue(formik.touched, id) && !Object.GetNestedValue(formik.errors, id),
        }) : className}
        dateFormat={dateFormat}
        selected={Object.GetNestedValue(formik.values, id)}
        onChange={opt => formik.setFieldValue(id, opt)}
        value={Object.GetNestedValue(formik.values, id)}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        popperPlacement={popperPlacement || 'bottom-end'}
        locale={language || 'tr' || locale}
        popperProps={{ strategy: 'fixed' }}
        autoComplete="off"
        disabled={disabled}
        showTimeSelect={showTimeSelect}
        timeFormat={showTimeSelect ? timeFormat : ''}
        timeCaption={T(timeCaption)}
        timeIntervals={15}
        showMonthYearPicker={showMonthYearPicker}
        showFullMonthYearPicker={showFullMonthYearPicker}
        isClearable={isClearable}
      />

      {(Object.GetNestedValue(formik.errors, id) && (Object.GetNestedValue(formik.touched, id)))
        && (
          <div className="fv-plugins-message-container">
            <span role="alert" className="text-danger">{Object.GetNestedValue(formik.errors, id)}</span>
          </div>
        )}
    </div>
  );
};

FormikDatePicker.propTypes = {
  formik: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  selectsStart: PropTypes.bool,
  selectsEnd: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  popperPlacement: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  timeFormat: PropTypes.string,
  timeCaption: PropTypes.string,
  showMonthYearPicker: PropTypes.bool,
  showFullMonthYearPicker: PropTypes.bool,
  locale: PropTypes.string,
  isClearable: PropTypes.bool,
  wrapperClassName: PropTypes.string,
};

// FormikDatePicker.defaultProps = {
//   className: 'form-control',
//   dateFormat: 'dd/MM/yyyy',
//   selectsStart: baseDatePicker.props.selectsStart,
//   selectsEnd: baseDatePicker.props.selectsEnd,
//   startDate: baseDatePicker.props.startDate,
//   endDate: baseDatePicker.props.endDate,
//   minDate: baseDatePicker.props.minDate,
//   maxDate: baseDatePicker.props.maxDate,
//   popperPlacement: 'bottom-end',
//   label: null,
//   name: null,
//   required: false,
//   disabled: false,
//   showTimeSelect: false,
//   timeFormat: 'HH:mm',
//   timeCaption: 'Saat',
//   showMonthYearPicker: false,
//   showFullMonthYearPicker: false,
//   locale: 'tr',
//   isClearable: false,
//   wrapperClassName: '',
// };

export default FormikDatePicker;
