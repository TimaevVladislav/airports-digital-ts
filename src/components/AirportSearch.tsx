import React, {useEffect, useState} from 'react'
import {useInput} from "../hooks/input"
import {useDebounce} from "../hooks/debounce"
import axios from "../axios"
import {IAirport} from "../models/models"
import classes from "../css/modules/AirportSearch.module.css"

export function AirportSearch() {
    const input = useInput("")

    const [airports, setAirports] = useState<IAirport[]>([])
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce<string>(input.value, 500)

    async function searchAirports() {
       const response = await axios.get(`users`, {params: {search: debounced, count: 10}})

        setDropdown(true)
        setAirports(response.data)
    }

    useEffect(() => {
        if (input.value.length > 3)                {
          searchAirports()
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
                        <li key={airport.id}>
                            {airport.name}
                        </li>
                    ))
                }
               </ul>
            }
        </div>
    )
}