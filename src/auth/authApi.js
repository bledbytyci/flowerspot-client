import Api from '../setup/api';
import Config from '../config/config.json';

class AuthApi {
    static get baseUrl() {
        return `${Config.proxyBaseUrl}/users`;
    }

    static logIn(user) {
        return Api.postJson(`${AuthApi.baseUrl}/login`, user);
	}
	
	static signUp(user) {
        return Api.postJson(`${AuthApi.baseUrl}/register`, user);
    }

    static editProfile(user) {
        return Api.putJson(`${AuthApi.baseUrl}/${user.id}`, user);
    }

    static deleteProfile(id) {
        return Api.deleteJson(`${AuthApi.baseUrl}/${id}`);
    }
	
    static getProfile() {
        return Api.getJson(`${AuthApi.baseUrl}/me`);
    }

    static getProfileById(id) {
        return Api.getJson(`${AuthApi.baseUrl}/${id}`);
    }
}

export default AuthApi;