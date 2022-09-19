import styled from 'styled-components';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

import InputFieldComponent from 'components/input-field';

export const Form = styled.form`
    width: 100%;
    margin-bottom: 64px;
`;

export const InputField = styled(InputFieldComponent)`
    margin-bottom: 24px;
`;

export const Button = styled(AntButton)<AntButtonProps>`
    width: 100%;
`;
