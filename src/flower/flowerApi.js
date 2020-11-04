import Config from '../config/config.json'
import Api from '../setup/api';

class FlowerApi {
	static get baseUrl() {
        return `${Config.proxyBaseUrl}/flowers`;
    }

    static createFlower(flower) {
        return Api.postJson(FlowerApi.baseUrl, flower);
    }

    static getFlowersFiltered(filter) {
        return Api.getJson(`${FlowerApi.baseUrl}/search?query=${filter}`);
    }

    static getFlowers() {
        return Api.getJson(`${FlowerApi.baseUrl}`);
    }
}

export default FlowerApi
