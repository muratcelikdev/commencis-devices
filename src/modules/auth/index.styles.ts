import styled from 'styled-components';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

import InputField from 'components/input-field';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 500px;
`;

export const Input = styled(InputField)`
    width: 100%;
    margin-bottom: 24px;
`;

export const Button = styled(AntButton)<AntButtonProps>`
    width: 100%;
    margin-bottom: 12px;
`;
