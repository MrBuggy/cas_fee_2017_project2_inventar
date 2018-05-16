// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDCATbLH5srdYTIS_th5I2Xs5p2tXwK79A',
    authDomain: 'inventarmaterialtest.firebaseapp.com',
    projectId: 'inventarmaterialtest',
    databaseURL: 'https://inventarmaterialtest.firebaseio.com',
    storageBucket: 'inventarmaterialtest.appspot.com',
    messagingSenderId: '131804679575'
  }
};
