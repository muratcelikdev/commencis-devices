import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { DeviceProps } from 'components/device-form';
import { useMemo } from 'react';

export interface DeviceTableData {
    approved: boolean;
    name: string;
    possessionDate: string | null;
    userEmail: string;
    userId: string;
}

export interface DeviceTableProps {
    dataSource: Array<DeviceTableData>;
    onEdit: (device: DeviceProps) => void;
    onDelete: (device: DeviceProps) => void;
}

const DeviceTable = ({
    dataSource,
    onEdit,
    onDelete,
}: DeviceTableProps): JSX.Element => {
    const columns: ColumnsType<DeviceTableData> = useMemo(
        () => [
            {
                title: 'Email',
                dataIndex: 'userEmail',
                key: 'userEmail',
                render: (text) => <span>{text}</span>,
            },
            {
                title: 'Device',
                dataIndex: 'name',
                key: 'name',
                render: (device) => <span>{device}</span>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (props) => (
                    <button onClick={() => onEdit(props)}>Edit</button>
                ),
            },
            {
                title: 'Delete',
                key: 'delete',
                render: (props) => (
                    <button onClick={() => onDelete(props)}>Delete</button>
                ),
            },
        ],
        [onEdit, onDelete]
    );

    return <Table columns={columns} dataSource={dataSource} />;
};

export default DeviceTable;
