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
	
    static getProfile() {
        return Api.getJson(`${AuthApi.baseUrl}/me`);
    }
}

export default AuthApi;