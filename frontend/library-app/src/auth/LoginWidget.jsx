import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';
import { SpinnerLoading } from '../layout/Utils/SpinnerLoading';

/**
 * useOktaAuth: This is a custom React hook provided by the @okta/okta-react library. 
 *              It allows you to access Okta-related authentication 
 *              and authorization features in your React components.
 * const { oktaAuth, authState } = useOktaAuth();: This line of code is using destructuring
 *                  assignment to extract two values, oktaAuth and authState, 
 *                  from the return value of the useOktaAuth hook.
 * oktaAuth: This is an instance of the OktaAuth class, 
 *          which provides various methods and properties for handling authentication with Okta, 
 *          such as login, logout, and accessing user information.
 * authState: This represents the current authentication state of the user. 
 *            It contains information like whether the user is authenticated or not,
 *           the access token, and the user profile.
 * 
 */

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
        console.log("Token: ", tokens);
        // console.log("ID Token: ", tokens.idToken);
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