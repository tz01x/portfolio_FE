
export interface Project {
    discribtion: string
    imgname: string
    sorcecode: string
    source_name: string
    title: string
    live_demo: string
}

export interface PaginationResponse<T>{
    count: number
    next: string
    prev: string
    results: T[]
}

export interface BlogsList {
    id: number
    title: string
    shortDescription: string
    url: string
    hits: number
}