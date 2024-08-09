import React from 'react';
import Input from './Input';
import Radio from './Radio';
import File from './File';

const FormikControl = (props) => {
    switch (props.control) {
        case 'input':
            return <Input {...props} />

        case 'radio':
            return <Radio {...props} />

        case 'file':
            return <File {...props} />

        default:
            break;
    }
}

export default FormikControl;
