
export interface IAirport {
    id: number
    name: string
    username: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
    }
    geo: {
        lat: string
        lng: string
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

export interface ServerResponse<T> {
    count: number
    next: number
    previos: number
    results: T[]
}

export type IAirportType = string
export type IAirportRegion = string
export type IAirportCountry = string

export interface IFilter {
  type: IAirportType
  region: IAirportRegion
  country: IAirportCountry
}
