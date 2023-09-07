import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Invite = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/organization/onboard/register', { state: { token, email } });
    }, []);

    if (!token) {
        navigate(-1);
    }

    return <div></div>;
};

export default Invite;
