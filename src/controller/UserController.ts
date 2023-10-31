import ApiUser from "../services/user.ts";
import store from "../core/Store";


class UserController {
    private api: ApiUser;
    constructor() {
        this.api = new ApiUser();

    }

    public getUser() {
        this.api.user().then(data => {
            if (data.status === 200) {
                store.set('user', data.response);
            } else {
                console.error('login error');
            }
        }).catch((error)=> {
            throw new Error('Failed auth' + error)
        });
    }

    public authUser(formObject) {
        this.api.login(formObject).then(data => {
            if (data.status === 200) {
                // store.set('user', data);
                console.log('data', data)
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
