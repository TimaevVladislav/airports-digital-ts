import axios from "../../axios"
import {AppDispatch} from "../index"
import {airportSlice} from "../slices/airportSlice"

export const fetchAirports = (page = 1, count = 50) => {
  return async (dispatch: AppDispatch) => {
    try {
        dispatch(airportSlice.actions.fetching())
        const response = await axios.get("users", {
            params: { page, count }
        })
        // Передать state в slice
        dispatch(airportSlice.actions.fetchSuccess({
            airports: response.data,
            count: response.data.id
        }))
    } catch (e) {
        dispatch(airportSlice.actions.fetchError(e as Error))
        console.log(e)
    }
  }
}