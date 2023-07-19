# Getting Started with Library App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Route Configuration
-- Downgrade Route Configuration to 5
    cmd: npm install react-router-dom@5

### OKTA Configuration
1. Create OKTA Account at : https://developer.okta.com/
2. Add a new user For Login:
    - Email: testuser@email.com
    - password: ranj12345
3. Create a new Application: Create App Intigration> OIDC> Single Page Application
4. Set URL Path: localhost:3000
5. Install Dependencies
    - npm install @okta/okta-react@6.4.3
    - npm install @okta/okta-signin-widget@6.3.3
