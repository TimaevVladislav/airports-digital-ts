import React, {useEffect, useRef} from 'react'
import ReactPaginate from 'react-paginate'

import {AirportSearch} from "../components/AirportSearch"
import {AirportFilter} from "../components/AirportFilter"
import {AirportCard} from "../components/AirportCard"
import {fetchAirports} from "../store/actions/airportActions"
import {useAppDispatch, useAppSelector} from "../hooks/redux"


const ITEMS_PER_PAGE = 50

export function MainPage() {
    const dispatch = useAppDispatch()

    const page = useRef(1)
    const {error, loading, airports, count} = useAppSelector(state => state.airport)

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE)

    const pageChangeHandler = ({selected}: { selected: number }) => {
      page.current = selected
    }

    useEffect(() => {
       dispatch(fetchAirports(page.current, ITEMS_PER_PAGE))
    }, [dispatch, page])

    return (
        <div className="container mx-auto max-w-[760px] pt-5">
           <AirportSearch />
           <AirportFilter />

            { loading && <p className="text-center text-lg">Loading...</p> }
            { error && <p className="text-center text-red-600">{error}</p>}

            {
                airports.map(airport => <AirportCard key={airport.id} airport={airport} />)
            }

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={pageChangeHandler}
                pageRangeDisplayed={5}
                forcePage={page.current - 1}
                pageCount={pageCount}
                previousLabel="< previous"
                containerClassName="flex"
                pageClassName="py-2 px-2 border mr-2"
                previousClassName="py-2 px-2 border mr-2"
                nextClassName="py-2 px-2 border mr-2"
                activeClassName="bg-gray-500 text-white"
            />
        </div>
    )
}