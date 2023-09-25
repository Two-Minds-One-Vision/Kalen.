import { useField } from "formik"
import "./FormTextArea.css"

const FormTextArea = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);

    return (
        <div id="form-text-area">
            {label ? (
                <label htmlFor={props.name}>{label}</label>
            ) : null}
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
            {props.descriptor ? (
                <small className="form-text" id={props["aria-describedby"]} muted>{props.descriptor}</small>
            ) : null}
        </div>
    );
};

export default FormTextArea
