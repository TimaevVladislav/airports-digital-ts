import axios from "../../axios"
import {AppDispatch} from "../index"
import {handbookSlice} from "../slices/handbookSlice"
import {IAirport} from "../../models/models"

export const fetchHandbooks = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(handbookSlice.actions.fetching())
            const response = await Promise.all([
                axios.get<IAirport[]>("users"),
                axios.get<IAirport[]>("users"),
                axios.get<IAirport[]>("users")
            ])
            // Передать state в slice
            dispatch(handbookSlice.actions.fetchingSuccess({
                types: response[0].data,
                countries: response[1].data,
                regions: response[2].data
            }))
        } catch (e) {
            console.log(e)
        }
    }
}