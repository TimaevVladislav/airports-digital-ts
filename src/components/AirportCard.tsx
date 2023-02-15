import React from 'react'
import {IAirport} from "../models/models"
import classes from "../css/modules/AirportCard.module.css"

import {useNavigate} from "react-router-dom"

interface AirportCardProps {
  airport: IAirport
}


export function AirportCard({ airport }: AirportCardProps) {

    const navigate = useNavigate()

    const clickHandler = () => navigate(`airport/${airport.id}`)

    return (
        <div className={classes.card} onClick={clickHandler}>
           <p className={classes.heading}>
               {airport.name}
           </p>
           <p>{airport?.address.street}</p>
           <p>{airport?.address.suite}</p>
           <p>{airport?.address.city}</p>
           <p>{airport?.address.zipcode}</p>
        </div>
    )
}