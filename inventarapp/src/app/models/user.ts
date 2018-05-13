export class User {
  uid?: string;
  firstName?: string;
  displayName?: string;
  password?: string;
  photoURL?: string;
  email: string;

  constructor(userData) {
    this.email = userData.email;
    this.displayName = userData.displayName;
    this.photoURL = userData.photoURL;
    this.uid = userData.uid;
  }
}
