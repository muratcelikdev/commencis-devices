import { useFormik } from 'formik';
import * as yup from 'yup';

import { signUp } from 'api/api';

import { COMMENCIS_MAIL_REGEX, PASSWORD_REGEX } from 'common/regex';

import * as S from 'modules/auth/index.styles';

export interface RegisterFormFields {
    email: string;
    password: string;
    repassword: string;
}

const REGISTER_FORM_INITIAL_VALUES = {
    email: '',
    password: '',
    repassword: '',
};

const Register = (): JSX.Element => {
    const registerFormValidations = yup.object().shape({
        email: yup
            .string()
            .email('input must be an email')
            .test('email', 'Must be a commencis email', (value) => {
                if (value?.match(COMMENCIS_MAIL_REGEX)) {
                    return true;
                }

                return false;
            }),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 character')
            .test(
                'password',
                'Password must contain at least one uppercase letter',
                (value) => {
                    if (value?.match(PASSWORD_REGEX)) {
                        return true;
                    }

                    return false;
                }
            ),
        repassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    });

    const registerForm = useFormik<RegisterFormFields>({
        initialValues: REGISTER_FORM_INITIAL_VALUES,
        validationSchema: registerFormValidations,
        onSubmit: async ({ email, password }) => {
            console.log('Hello from register');
            const signUpResponse = await signUp({ email, password });

            console.log({ signUpResponse });
        },
    });

    return (
        <S.FormContainer onSubmit={registerForm.handleSubmit}>
            <S.Input name="email" form={registerForm} placeholder="Email" />
            <S.Input
                type="password"
                name="password"
                form={registerForm}
                placeholder="Password"
            />
            <S.Input
                type="password"
                name="repassword"
                form={registerForm}
                placeholder="Re-Password"
            />
            <S.Button type="primary" htmlType="submit">
                Register
            </S.Button>
        </S.FormContainer>
    );
};

export default Register;
