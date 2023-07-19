import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';
import { SpinnerLoading } from '../layout/Utils/SpinnerLoading';

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
        console.log("Access Token: ", tokens.accessToken);
        console.log("ID Token: ", tokens.idToken);
    };

    const onError = (err) => {
        console.log('Sign in error: ', err);
    }
    // console.log("oktaAuth: " + oktaAuth);

    if (!authState) {
        return (
            <SpinnerLoading/>
        );
    }

    return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/>
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>;
};

export default LoginWidget;