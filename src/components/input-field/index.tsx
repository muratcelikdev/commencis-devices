import { HTMLInputTypeAttribute } from 'react';
import { FormikProps } from 'formik';

import * as S from 'components/input-field/index.styles';

export interface InputFieldProps
    extends React.HTMLAttributes<HTMLInputElement> {
    name: string;
    form: FormikProps<any>;
    className?: string;
    type?: HTMLInputTypeAttribute;
}

const InputField = ({
    name,
    form,
    className,
    type,
    ...restProps
}: InputFieldProps) => {
    const { values, errors, handleChange } = form;

    let error: any = null;

    if (typeof errors[name] === 'string') {
        error = errors[name];
    }

    return (
        <S.InputWrapper className={className}>
            <S.Input
                type={type || 'text'}
                id={name}
                name={name}
                onChange={handleChange}
                value={values[name]}
                {...restProps}
            />
            <S.ErrorWrapper>{error}</S.ErrorWrapper>
        </S.InputWrapper>
    );
};

export default InputField;
