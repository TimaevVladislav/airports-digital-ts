import React, {useEffect, useState} from 'react'
import {useInput} from "../hooks/input"
import {useDebounce} from "../hooks/debounce"
import axios from "../axios"
import {IAirport} from "../models/models"
import classes from "../css/modules/AirportSearch.module.css"
import {useNavigate} from "react-router-dom"

export function AirportSearch() {
    const input = useInput("")
    const navigate = useNavigate()

    const [airports, setAirports] = useState<IAirport[]>([])
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce<string>(input.value, 500)

    async function searchAirports(): Promise<void> {
       const response = await axios.get(`users`, {params: {search: debounced, count: 10}})

        setAirports(response.data)
    }

    useEffect(() => {
        if (debounced.length > 3)                {
          searchAirports().then(() => setDropdown(true))
        } else {
          setDropdown(false)
        }
    }, [debounced])

    return (
        <div className="mb-4 relative">
            <input
              type="text"
              className="border py-2 px-4 mb-4 outline-0 w-full h-[42px]"
              placeholder="Type something here..."
              {...input}
            />

            { dropdown &&
                <ul className={classes.dropdown}>
                {
                    airports.map(airport => (
                        <li
                            key={airport.id}
                            className="py-2 px-4 mb-2 hover:bg-gray-500 hover:transition-colors cursor-pointer hover:text-white"
                            onClick={() => navigate(`/airport/${airport.id}`)}
                        >
                            {airport.name}
                        </li>
                    ))
                }
               </ul>
            }
        </div>
    )
}