import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { signIn } from 'api/api';

import { COMMENCIS_MAIL_REGEX, PASSWORD_REGEX } from 'common/regex';

import * as S from 'modules/auth/index.styles';

import { PATHS } from 'routes/Paths';

export interface LoginFormFields {
    email: string;
    password: string;
}

const LOGIN_FORM_INITIAL_VALUES = {
    email: '',
    password: '',
};

const Login = (): JSX.Element => {
    const navigate = useNavigate();

    const loginFormValidations = yup.object().shape({
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
    });

    const loginForm = useFormik<LoginFormFields>({
        initialValues: LOGIN_FORM_INITIAL_VALUES,
        validationSchema: loginFormValidations,
        onSubmit: async ({ email, password }) => {
            try {
                const signInResponse = await signIn({ email, password });

                if (signInResponse) {
                    navigate(PATHS.DEVICES);
                }
            } catch (error) {}
        },
    });

    return (
        <S.FormContainer onSubmit={loginForm.handleSubmit}>
            <S.Input name="email" form={loginForm} placeholder="Email" />
            <S.Input
                type="password"
                name="password"
                form={loginForm}
                placeholder="Password"
            />
            <S.Button type="primary" htmlType="submit">
                Login
            </S.Button>
            <S.Button
                type="link"
                htmlType="button"
                onClick={() => navigate(PATHS.REGISTER)}
            >
                Register
            </S.Button>
        </S.FormContainer>
    );
};

export default Login;
