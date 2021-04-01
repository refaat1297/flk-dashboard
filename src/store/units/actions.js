import axios from "axios";

export default {
    async getUnits ({ commit }) {
        await axios.get('/units.json')
            .then(res => {
                let units = Object.entries(res.data).map(unit => {
                    return Object.assign({}, unit[1], {
                        id: unit[0]
                    })
                })

                commit('SET_UNITS', units)
            })
    }
}