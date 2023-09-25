import React, { useState } from 'react'
import moment from 'moment'
import { useField } from "formik"
import "./FormDateTimePicker.css"

const FormDateTimePicker = ({ label, setFieldValue, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [_, meta] = useField(props);

    let initialDate = ""
    if (props?.initial) {
        initialDate = moment(props.initial).format("YYYY-MM-DDTHH:mm")
    }

    const [date, setDate] = useState(initialDate)
    const handleChange = (e) => {
        setDate(e.target.value)
        setFieldValue(props.name, e.target.value)
    }

    return (
        <div id="form-dtp-area">
            {label ? (
                <label htmlFor={props.name}>{label}</label>
            ) : null}
            <input id="date-picker" type="datetime-local" value={date} onChange={handleChange} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
            {props.descriptor ? (
                <small className="form-text" id={props["aria-describedby"]} muted>{props.descriptor}</small>
            ) : null}
        </div>
    );
}

export default FormDateTimePicker
