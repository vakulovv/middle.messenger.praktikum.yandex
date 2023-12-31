import ApiUser from '../services/user.ts';
import store from '../core/Store';

const logout = () => {
  store.set('auth', false);
  window.localStorage.removeItem('auth');
};

class UserController {
  private api: ApiUser;

  constructor() {
    this.api = new ApiUser();
  }

  public getUser() {
    this.api.user().then((data: Record<string, any>) => {
      if (data && data.status === 200) {
        store.set('user', JSON.parse(data.response));
      } else {
        logout();
      }
      return true;
    }).catch((error) => {
      console.log(`Failed get data user ${error}`);
    });
  }

  public logout() {
    this.api.logout().then(() => {
      logout();
    }).catch((error) => {
      console.log(`Failed logout ${error}`);
    });
  }

  public avatar(data: Record<string, any>) {
    this.api.avatar(data).then(() => {
      this.getUser();
    }).catch((error) => {
      console.log(`Failed get user avatar ${error}`);
    });
  }

  public profile(data: Record<string, any>) {
    return this.api.profile(data).then(() => {
      this.getUser();
      return true;
    }).catch((error) => {
      console.log(`Failed update user profile ${error}`);
    });
  }

  public password(data: Record<string, any>) {
    return this.api.password(data).then(() => {
      this.getUser();
      return true;
    }).catch((error) => {
      console.log(`Failed update password ${error}`);
    });
  }

  search(login: string) {
    this.api.find(login).then((data: Record<string, any>) => {
      if (data && data.status === 200) {
        store.set('users', JSON.parse(data.response));
      }
    }).catch((error) => {
      console.log(`Failed find user ${error}`);
    });
  }

  public authUser(formObject: Record<string, any>) {
    this.api.login(formObject).then((data: Record<string, any>) => {
      if (data.status === 200) {
        store.set('auth', true);
        window.localStorage.setItem('auth', 'true');
      }
      if (data.status === 400) {
        const response = data && data.status ? JSON.parse(data.response) : null;
        if (response.reason === 'User already in system') {
          store.set('auth', true);
          window.localStorage.setItem('auth', 'true');
        }
      }
    }).catch((error) => {
      console.log(`Failed auth user ${error}`);
    });
  }

  public signUp(formObject: Record<string, any>) {
    this.api.signup(formObject).then((data: Record<string, any>) => {
      if (data.status === 200) {
        /* eslint no-console:0 */
        console.log('signup');
      } else {
        /* eslint no-console:0 */
        console.error('login error');
      }
    }).catch((error) => {
      console.error(`login error ${error}`);
    });
  }
}

export default UserController;
