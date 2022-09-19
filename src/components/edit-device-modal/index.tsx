import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';

import EditDeviceForm, { DeviceProps } from 'components/device-form';
import * as S from 'components/edit-device-modal/index.styles';

export interface EditDeviceModalProps extends AntModalProps {
    device: DeviceProps;
    onSubmit: (device: DeviceProps) => void;
}

const EditDeviceModal = ({
    device,
    visible,
    onSubmit,
    ...restProps
}: EditDeviceModalProps) => {
    return (
        <AntModal visible={visible} footer={null} {...restProps}>
            <S.FormWrapper>
                <EditDeviceForm onSubmit={onSubmit} device={device} />
            </S.FormWrapper>
        </AntModal>
    );
};

export default EditDeviceModal;
