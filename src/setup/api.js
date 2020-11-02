import Axios from 'axios';
import HttpVerbs from '../setup/httpVerbs';

class Api {
    static getJson(url) {
        return this._do(HttpVerbs.GET, url, undefined);
	}
	
	static postJson(url, data) {
        return this._do(HttpVerbs.POST, url, data);
    }

    static _do(verb, url, data) {
		const authToken = localStorage.getItem('auth_token')
        const authorization = authToken ? `Basic ${authToken}` : null;


        const headersToSend = {
            'Content-Type': 'application/json',
            'Accept-Language': 'en_GB',
        };

        if(authorization) {
            headersToSend.Authorization = authorization;
        }

        return Axios({
            method: verb,
            url: url,
            data: data,
            headers: headersToSend
        })
            .then(response => ({ response }))
            .catch(errorResponse => ({ errorResponse }));
    }
}

export default Api;