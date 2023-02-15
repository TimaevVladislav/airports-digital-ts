import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {IFilter} from "../models/models"

import classes from "../css/modules/AirportFilter.module.css"
import {airportSlice} from "../store/slices/airportSlice";

export function AirportFilter() {
    const dispatch = useAppDispatch()
    const {regions, countries, loading, types} = useAppSelector(state => state.handbook)

    const [hasFilter, setHasFilter] = useState(false)
    const [filter, setFilter] = useState<IFilter>({ type: "", country: "", region: "" })

    useEffect(() => {
        if (isFilterEnabled()) {
            setHasFilter(true)
        }

        dispatch(airportSlice.actions.filter(filter))
    }, [filter])

    if (loading) return <p className="text-center">Loading...</p>

    const isFilterEnabled = () => filter.type || filter.country || filter.type

    const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => setFilter((prevState => ({ ...prevState, [event.target.name]: event.target.value })))

    const clearFilter = () => {
        setHasFilter(false)
        setFilter({ type: "", country: "", region: "" })
        console.log(filter)
    }


    return (
       <div className="border py-2 px-4 mb-2">
          <span className="font-bold mr-2">Filter</span>

           <select
            name="type"
            className={classes.select}
            defaultValue=""
            onChange={changeHandler}
           >
               <option value="" disabled>Type</option>
               {types.map(type => <option key={type.id}>{type.name}</option>)}
           </select>

           <select
            name="country"
            className={classes.select}
            defaultValue=""
            onChange={changeHandler}
           >
               <option value="" disabled>Country</option>
               {countries.map(country => <option key={country.id}>{country.name}</option>)}
           </select>

           {/*<select*/}
           {/*  name="region"*/}
           {/*  className={classes.select}*/}
           {/*  defaultValue=""*/}
           {/*  onChange={changeHandler}*/}
           {/*>*/}
           {/*    <option value="" disabled>Region</option>*/}
           {/*    {regions.map(region => <option key={region.id}>{region.name}</option>)}*/}
           {/*</select>*/}

           { hasFilter && <button onClick={clearFilter} className={classes.btn}>&times;</button> }
       </div>
   )
}