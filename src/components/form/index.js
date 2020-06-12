import React from "react";
import PropTypes from 'prop-types';
import {Field, ErrorMessage} from 'formik';
import './style.scss';

function getLabel(label, props) {
    if (label) {
        return (
            <label htmlFor={props.id} className={`control-label ${props.classLabel || ''}`}>
                {label}
            </label>
        )
    }
}

export function Input (props) {
    return (
        <div className={`form-group ${props.classContainer || ''}`}>
            {getLabel(props.label || false, props)}
            <Field type={props.type || 'text'} name={props.name} className={`form-control ${props.classInput || ''}`} placeholder={props.placeholder}/>
            <ErrorMessage name={props.name} component="span" className="help-block color-danger" />
        </div>
    )
}

export function Checkbox (props) {
    return (
        <div className="form-group">
            <div className="form-group-checkbox">
                <Field id={props.id} type="checkbox" name={props.name} className={`${props.classInput || ''}`} />
                {getLabel(props.label, props)}
            </div>
            <ErrorMessage name={props.name} component="span" className="help-block color-danger" />
        </div>
    )
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired
}