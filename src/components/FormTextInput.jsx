import { useField } from "formik"
import "./FormTextInput.css"


const FormTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <div id="form-text-input">
            {label ? (
                <label htmlFor={props.name}>{label}</label>
            ) : null}
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
            {props.descriptor ? (
                <small className="form-text" id={props["aria-describedby"]} muted>{props.descriptor}</small>
            ) : null}
        </div>
    );
};

export default FormTextInput
