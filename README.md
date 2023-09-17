# fullstack-react-springboot
This is full stack project, which include react as frontend, spring Boot as backend and MySQL as database

## Getting Started with Library App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm intall` -- for installing dependency
### `npm start` -- for starting application
### `npm run build` -- for development server

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

    - username: testadmin@email.com
    - password: ranjan12345 

3. Create a new Application: Create App Intigration> OIDC> Single Page Application
4. Set URL Path: localhost:3000
5. Install Dependencies
    - npm install @okta/okta-react@6.4.3
    - npm install @okta/okta-signin-widget@6.3.3

### Using less code to increase readability
1. const responseJSONData = responseJSON._embedded.books;
      const loadedBookfromDatabase: BookModel[] = [];

      for (const key in responseJSONData) {
        loadedBookfromDatabase.push({
          id: responseJSONData[key].id,
          title: responseJSONData[key].title,
          author: responseJSONData[key].author,
          description: responseJSONData[key].description,
          copies: responseJSONData[key].copies,
          copiesAvailable: responseJSONData[key].copiesAvailable,
          category: responseJSONData[key].category,
          img: responseJSONData[key].img,
        });
      }
      setBookAPI(loadedBookfromDatabase);
    - It is suggested to use when
        - you need to perform some additional operations or data manipulation on each book object before using it in your application.
        - The data from the API response is not in the exact format you need, and you have to convert it to match a specific interface or type, like the BookModel.

2. setbookHistories(responseJSON._embedded.books);
    - It is suggested when-
      - The data returned from the API is already in the desired format and directly usable in your application without any additional transformation or manipulation.
      - You don't need to perform any specific operations on each book object before using it.
    Note: In general, if the API response already provides the data in the format required by your application (in this case, the BookModel interface), you can directly use responseJSON._embedded.books and avoid the extra overhead of the loop and manual transformation. However, if there is a need to modify or adapt the data before using it, then you would opt for the first code snippet with the loop and transformation logic.

### Razorpayment Integration
1. Email: developwithranjan@gmail.com
2. Dashboard: `https://dashboard.razorpay.com/app/dashboard`
3. Docs: `https://razorpay.com/docs/payments/server-integration/java/payment-gateway/build-integration/`
4. Test key and secret: `https://dashboard.razorpay.com/app/website-app-settings/api-keys`

### Sweet Alert Package
1. sweet Alert Link: `https://sweetalert.js.org/guides/#advanced-examples`
2. sweet npm library: `https://www.npmjs.com/package/sweetalert`
