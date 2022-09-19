import { useFormik } from 'formik';
import * as yup from 'yup';

import { COMMENCIS_MAIL_REGEX } from 'common/regex';

import * as S from 'components/device-form/index.styles';

export interface DeviceFields {
    email: string;
    device: string;
}

export interface DeviceProps extends DeviceFields {
    id?: string;
}

export interface DeviceFormProps {
    onSubmit: (device: DeviceProps) => void;
    device?: DeviceProps;
}

const DeviceForm = ({ onSubmit, device }: DeviceFormProps): JSX.Element => {
    const validationDevice = yup.object().shape({
        email: yup
            .string()
            .email('input must be an email')
            .test('email', 'Must be a commencis email', (value) => {
                if (value?.match(COMMENCIS_MAIL_REGEX)) {
                    return true;
                }

                return false;
            }),
        device: yup
            .string()
            .required('cannot be empty')
            .min(8, 'device must be at least 8 characters'),
    });

    const formikDevice = useFormik<DeviceProps>({
        initialValues: {
            email: device?.email || '',
            device: device?.device || '',
        },
        validationSchema: validationDevice,
        onSubmit: (values) => {
            const submitParam = { ...values };

            if (device?.id) {
                submitParam.id = device.id;
            }

            onSubmit(submitParam);
        },
    });
    return (
        <S.Form onSubmit={formikDevice.handleSubmit}>
            <S.InputField
                name="email"
                form={formikDevice}
                placeholder="Email"
            />
            <S.InputField
                name="device"
                form={formikDevice}
                placeholder="Device Name"
            />
            <S.Button type="primary" htmlType="submit">
                Submit
            </S.Button>
        </S.Form>
    );
};

export default DeviceForm;
