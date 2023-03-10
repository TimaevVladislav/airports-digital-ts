import {IAirport, IFilter} from "../../models/models"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface AirportState {
  loading: boolean
  error: string
  count: number
  airports: IAirport[]
  airportsContainer: IAirport[]
}

// Начальное состояние Redux Toolkit slice

const initialState: AirportState = {
    loading: false,
    error: "",
    count: 1,
    airports: [],
    airportsContainer: []
}

interface AirportPayload {
   airports: IAirport[]
   count: number
}


export const airportSlice = createSlice({
  name: "airport",
  initialState: initialState,
  //  Управление состоянием через функции редюсеры
  reducers: {
     fetching(state) {
       state.loading = true
     },
     fetchSuccess(state, action: PayloadAction<AirportPayload>) {
       state.loading = false
       state.airports = action.payload.airports
       state.airportsContainer = action.payload.airports
       state.count = action.payload.count
       state.error = ""
     },
     fetchError(state, action: PayloadAction<Error>) {
       state.loading = false
       state.error = action.payload.message
     },
     filter(state, action: PayloadAction<IFilter>) {
       state.airports = state.airportsContainer
           .filter(a => a.name.includes(action.payload.type))
           .filter(a => a.name.includes(action.payload.country))
           .filter(a => a.name.includes(action.payload.region))
     }
  }
})

export default airportSlice.reducer