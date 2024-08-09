import React from 'react';
import Input from './Input';
import Radio from './Radio';
import File from './File';
import Checkbox from './Checkbox';
import FildArray from './FildArray';

const FormikControl = (props) => {
    switch (props.control) {
        case 'input':
            return <Input {...props} />

        case 'radio':
            return <Radio {...props} />

        case 'file':
            return <File {...props} />

        case 'checkbox':
            return <Checkbox {...props} />

        case 'fildArray':
            return <FildArray {...props} />

        default:
            break;
    }
}

export default FormikControl;
