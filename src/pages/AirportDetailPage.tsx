import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "../axios"
import {IAirport, IAirportDetail} from "../models/models"

export function AirportDetailPage() {
    const params = useParams<"id">()

    const [airport, setAirports] = useState<IAirport | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchDetailAirport = async () => {
       const response = await axios.get("users")
        setAirports(response.data[0])

        if (params.id) setAirports(response.data[params.id])

        setLoading(false)
    }

    useEffect(() => {
        fetchDetailAirport()
    }, [])

    if (loading) return <p className="text-center">Loading...</p>







    return (
        <div className="container mx-auto pt-5 max-w-[760px]">
           <h1 className="text-center text-2xl">{airport?.name}</h1>
            <p>{airport?.address.street}</p>
            <p>{airport?.address.suite}</p>
            <p>{airport?.address.city}</p>
            <p>{airport?.address.zipcode}</p>
        </div>
    )
}