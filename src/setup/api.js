import Axios from 'axios';
import HttpVerbs from '../setup/httpVerbs';

class Api {
    static getJson(url) {
        return this._do(HttpVerbs.GET, url, undefined);
	}
	
	static postJson(url, data) {
        return this._do(HttpVerbs.POST, url, data);
    }

    static putJson(url, data) {
        return this._do(HttpVerbs.PUT, url, data);
    }

    static deleteJson(url, data) {
        return this._do(HttpVerbs.DELETE, url, data);
    }

    static _do(verb, url, data) {
		const authToken = localStorage.getItem('auth_token')
        const authorization = authToken ? `Bearer ${authToken}` : null;


        const headersToSend = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if(authorization) {
            headersToSend.Authorization = authorization;
        }

        return Axios({
            method: verb,
            url: url,
            data: data,
            headers: headersToSend,
            withCredentials: true
        })
            .then(response => ({ response }))
            .catch(errorResponse => ({ errorResponse }));
    }
}

export default Api;