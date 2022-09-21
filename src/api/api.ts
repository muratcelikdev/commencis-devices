import axios, { Method } from 'axios';

import { API_ROUTES } from 'api/constants';

export interface UserCredentials {
    email: string;
    password: string;
}

export interface DeviceInformation {
    name: string;
    possessionDate?: string;
}

const { AUTH, DEVICES, CREATE_DEVICE, DEVICE } = API_ROUTES;

const makeServiceCall = async (url: string, method: Method, data?: any) => {
    try {
        const accessToken = window.localStorage.getItem('ACCESS_TOKEN');
        const response = await axios({
            method,
            url,
            data,
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return response?.data;
    } catch (error) {}
};

export const signUp = async ({ email, password }: UserCredentials) =>
    await makeServiceCall(`${AUTH}/signup`, 'POST', {
        email,
        password,
    });

export const signIn = async ({ email, password }: UserCredentials) =>
    await makeServiceCall(`${AUTH}/signin`, 'POST', {
        email,
        password,
    });

export const signOut = async () =>
    await makeServiceCall(`${AUTH}/signup`, 'POST');

export const getAllDevices = async () => await makeServiceCall(DEVICES, 'GET');

export const addNewDevice = async ({
    name,
    possessionDate,
}: DeviceInformation) =>
    await makeServiceCall(CREATE_DEVICE, 'POST', { name, possessionDate });

export const deleteDevice = async (id: string) => {
    const endpoint = DEVICE.replace(':id', id);
    return await makeServiceCall(endpoint, 'DELETE');
};

export const editDevice = async (id: string, name: string) => {
    const endpoint = DEVICE.replace(':id', id);
    return await makeServiceCall(endpoint, 'PATCH', { name });
};
