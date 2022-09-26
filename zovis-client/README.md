# How to run local version

1. ```npm i```
2. Create env file in top dir.
3. ```npm run start``` to start development server on localhost:3000


# How to build for production

1. Install firebase cli: ```npm install -g firebase-tools```
2. Build: ```npm run build``` to build for production
3. Setup firebase: ```firebase init```
    - Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
    - Use 'build' as public directory
    - Configure as a single page app
    - No automatic deploys
    - No overwrite of index.html
4. Deploy: ```firebase deploy --only hosting```
5. Validate: https://financieelpaspoort-1fd26.firebaseapp.com/login


# env entries
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID