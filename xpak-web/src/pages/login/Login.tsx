import { useEffect, useState } from 'react';
import keycloakService from '../../services/keycloakService';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDisplayMsg, setShowDisplayMsg] = useState(false);

    const redirectUrl = location?.state?.redirectUrl;

    useEffect(() => {
        const userAttributes = keycloakService.getUserAttr();
        if (keycloakService.isLoggedIn()) {
            console.log(userAttributes);
            if (keycloakService.hasRole(['ADMIN'])) {
                navigate('/admin');
            } else if (keycloakService.hasRole(['ORGANIZATION_ADMIN'])) {
                userAttributes?.organization
                    ? navigate('/organization')
                    : navigate('/organization/onboard/register', {
                          state: { token: 'available', email: keycloakService.getUser() },
                      });
            } else if (keycloakService.hasRole(['EMPLOYEE'])) {
                navigate('/care-home/dashboard');
            } else if (keycloakService.hasRole(['GUARDIAN'])) {
                navigate('/family/select-dependant');
            } else {
                setShowDisplayMsg(true);
            }
        } else {
            keycloakService.doLogin({ redirectUri: redirectUrl });
        }
    }, []);
    return <div>{showDisplayMsg && "User Doesn't have role or user's role not yet handled."}</div>;
};

export default Login;
