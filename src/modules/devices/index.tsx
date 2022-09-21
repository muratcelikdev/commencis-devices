import { useCallback, useEffect, useState } from 'react';

import {
    getAllDevices as getDevices,
    addNewDevice,
    deleteDevice,
    editDevice,
} from 'api/api';

import { DeviceFields, DeviceProps } from 'components/device-form';
import AddDeviceModal from 'components/add-device-modal';
import EditDeviceModal from 'components/edit-device-modal';
import DeviceTable, { DeviceTableData } from 'components/device-table';

import * as S from 'modules/devices/index.styles';

const Devices = (): JSX.Element => {
    const [devices, setDevices] = useState<DeviceTableData[]>([]);
    const [isAddDeviceModalVisible, setIsAddDeviceModalVisible] =
        useState<boolean>(false);
    const [deviceToUpdate, setDeviceToUpdate] = useState<DeviceProps | null>(
        null
    );

    const getAllDevices = useCallback(async () => {
        const devices = await getDevices();
        setDevices(devices);
    }, []);

    const toggleAddDeviceModalVisibility = useCallback(() => {
        setIsAddDeviceModalVisible(!isAddDeviceModalVisible);
    }, [isAddDeviceModalVisible]);

    const clearDeviceToUpdate = useCallback(() => {
        setDeviceToUpdate(null);
    }, []);

    const handleAddDeviceModalSubmit = useCallback(
        async ({ device }: DeviceFields) => {
            const addNewDeviceResponse = await addNewDevice({
                name: device,
                possessionDate: new Date().toISOString(),
            });
            await getAllDevices();
            setIsAddDeviceModalVisible(false);
        },
        [getAllDevices]
    );

    const handleEditDeviceModalSubmit = useCallback(
        async ({ id, email, device }: DeviceProps) => {
            if (id) {
                await editDevice(id, device);
                await getAllDevices();
                clearDeviceToUpdate();
            }
        },
        [getAllDevices, clearDeviceToUpdate]
    );

    const handleDeleteDevice = useCallback(
        async ({ id, email, device }: DeviceProps) => {
            if (id) {
                await deleteDevice(id);
                await getAllDevices();
                clearDeviceToUpdate();
            }
        },
        [deleteDevice]
    );

    useEffect(() => {
        getAllDevices();
    }, [getAllDevices]);

    return (
        <>
            <S.AddDeviceButton onClick={toggleAddDeviceModalVisibility}>
                Add Device
            </S.AddDeviceButton>
            <DeviceTable
                dataSource={devices}
                onEdit={setDeviceToUpdate}
                onDelete={handleDeleteDevice}
            />
            <AddDeviceModal
                visible={isAddDeviceModalVisible}
                onSubmit={handleAddDeviceModalSubmit}
                onCancel={toggleAddDeviceModalVisibility}
            />
            {deviceToUpdate && (
                <EditDeviceModal
                    device={deviceToUpdate}
                    visible={!!deviceToUpdate}
                    onSubmit={handleEditDeviceModalSubmit}
                    onCancel={clearDeviceToUpdate}
                />
            )}
        </>
    );
};

export default Devices;
