import Config from '../config/config.json'
import Api from '../setup/api';

class FlowerApi {
	static get baseUrl() {
        return `${Config.proxyBaseUrl}/flowers`;
    }

    static createFlower(flower) {
        return Api.postJson(`${FlowerApi.baseUrl}`, flower);
    }

    static updateFlower(flower) {
        return Api.putJson(`${FlowerApi.baseUrl}/${flower.id}`, flower);
    }

    static getFlowerById(id) {
        return Api.getJson(`${FlowerApi.baseUrl}/${id}`);
    }
    
    static getFlowersFiltered(filter) {
        return Api.getJson(`${FlowerApi.baseUrl}/search?query=${filter}`);
    }

    static getFlowers() {
        return Api.getJson(`${FlowerApi.baseUrl}`);
    }

    static getRandomFlowers() {
        return Api.getJson(`${FlowerApi.baseUrl}/random`);
    }

    static getFavoriteFlowers() {
        return Api.getJson(`${FlowerApi.baseUrl}/favorites`);
    }

    static markFlowerFavorite(id) {
        return Api.putJson(`${FlowerApi.baseUrl}/${id}/favorites`);
    }
    
    static setSightings(flower) {
        return Api.putJson(`${FlowerApi.baseUrl}/${flower.id}/sightnings`, flower);
    }

    static deleteFlower(flowerId) {
        return Api.deleteJson(`${FlowerApi.baseUrl}/${flowerId}`);
    }
}

export default FlowerApi
