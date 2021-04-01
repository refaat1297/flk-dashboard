export default {
    unitsNames (state) {
        return state.units.map(unit => unit.name)
    }
}