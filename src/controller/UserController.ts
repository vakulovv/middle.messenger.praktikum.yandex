import ApiUser from "../services/user.ts";
import store from "../core/Store";

const logout = () => {
    store.set('auth', false);
    window.localStorage.removeItem('auth');
}


class UserController {
    private api: ApiUser;
    constructor() {
        this.api = new ApiUser();
    }

    public getUser() {
        this.api.user().then(data => {
            if (data && data.status === 200) {
                store.set('user', JSON.parse(data.response));
            } else {
                logout();
            }
            return true;
        }).catch((error)=> {
            throw new Error('Failed auth' + error)
        });
    }

    public logout() {
        this.api.logout().then(() => {
            logout();
        }).catch((error)=> {
            throw new Error('Failed logout' + error)
        });
    }

    public avatar(data) {
        this.api.avatar(data).then(() => {
            this.getUser()
        }).catch((error)=> {
            throw new Error('Failed logout' + error)
        });
    }

    public profile(data) {
        return this.api.profile(data).then(() => {
            this.getUser();
            return true
        }).catch((error)=> {
            throw new Error('Failed logout' + error)
        });
    }

    public password(data) {
        return this.api.password(data).then(() => {
            this.getUser();
            return true
        }).catch((error)=> {
            throw new Error('Failed logout' + error)
        });
    }

    search(login) {
        this.api.find(login).then((data) => {
            if (data && data.status === 200) {
                store.set('users', JSON.parse(data.response));
            }
        })
    }

    public authUser(formObject) {
        this.api.login(formObject).then(data => {
            if (data.status === 200) {
                store.set('auth', true);
                window.localStorage.setItem('auth', 'true');
            } else {
                console.error('login error');
            }
        }).catch((error)=> {
            throw new Error('Failed auth' + error)
        });
    }


}

export default UserController;
