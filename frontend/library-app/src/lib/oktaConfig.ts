export const oktaConfig = {
    clientId: '0oaaelbblyAo27VPR5d7',
    issuer: 'https://dev-30518398.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}