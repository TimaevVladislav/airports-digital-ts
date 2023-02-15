import {IAirport, IAirportCountry, IAirportRegion, IAirportType} from "../../models/models"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface HandbookState {
    loading: boolean
    types: IAirport[]
    regions: IAirport[]
    countries: IAirport[]
}

interface HandbookPayload {
   types: IAirport[]
   countries: IAirport[]
   regions: IAirport[]
}


const initialState: HandbookState = {
    loading: false,
    types: [],
    regions: [],
    countries: []
}

export const handbookSlice = createSlice({
    name: "handbook",
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchingSuccess(state, action: PayloadAction<HandbookPayload>) {
            state.loading = false
            state.types = action.payload.types
            state.countries = action.payload.countries
            state.regions = action.payload.regions
        }
    }
})

export default handbookSlice.reducer