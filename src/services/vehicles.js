import axios from "axios";
const baseUrl = "https://carstockrest.herokuapp.com/cars"

const getAll = async () => {
    try {
        let response = await axios.get(baseUrl)
        return response.data._embedded.cars
    } catch (err) {
        console.error(err)
    }

}

const postOne = (newCar) => {
    return axios.post(baseUrl, newCar);
}

const removeOne = (carUrl) => {
    return axios.delete(carUrl);
}

const editOne = (carUrl, car) => {
    return axios.put(carUrl, car)
}

const vehicleService = {
    getAll,
    postOne,
    removeOne,
    editOne
}

export default vehicleService;