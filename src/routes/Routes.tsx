import { Routes as BrowserRoutes, Route } from 'react-router-dom';

import Login from 'modules/auth/login';
import Register from 'modules/auth/register';
import Devices from 'modules/devices';

import { PATHS } from 'routes/Paths';

const Routes = (): JSX.Element => {
    const isUserAuthenticated = false; // TODO: implement api

    return (
        <BrowserRoutes>
            <Route
                path={PATHS.HOME}
                element={isUserAuthenticated ? <Devices /> : <Login />}
            />
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path={PATHS.REGISTER} element={<Register />} />
            <Route path={PATHS.DEVICES} element={<Devices />} />
        </BrowserRoutes>
    );
};

export default Routes;
