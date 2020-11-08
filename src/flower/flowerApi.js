import Config from '../config/config.json'
import Api from '../setup/api';

class FlowerApi {
	static get baseUrl() {
        return `${Config.proxyBaseUrl}/flowers`;
    }

    static getFlowersFiltered(filter) {
        return Api.getJson(`${FlowerApi.baseUrl}/search?query=${filter}`);
    }

    static getFlowers() {
        return Api.getJson(`${FlowerApi.baseUrl}`);
    }

    static getFavoriteFlowers() {
        return Api.getJson(`${FlowerApi.baseUrl}/favorites`);
    }

    static markFlowerFavorite(id) {
        return Api.postJson(`${FlowerApi.baseUrl}/${id}/favorites`);
    }
}

export default FlowerApi
