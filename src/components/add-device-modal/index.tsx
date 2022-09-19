import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';

import AddDeviceForm, { DeviceFields } from 'components/device-form';
import * as S from 'components/add-device-modal/index.styles';

export interface AddDeviceModalProps extends AntModalProps {
    onSubmit: (fields: DeviceFields) => void;
}

const AddDeviceModal = ({
    visible,
    onSubmit,
    ...restProps
}: AddDeviceModalProps) => {
    return (
        <AntModal visible={visible} footer={null} {...restProps}>
            <S.FormWrapper>
                <AddDeviceForm onSubmit={onSubmit} />
            </S.FormWrapper>
        </AntModal>
    );
};

export default AddDeviceModal;
