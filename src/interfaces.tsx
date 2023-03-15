
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

export interface Category {
    name: string;
    id?: number | string;
}

export interface BlogsList {
    id: number
    title: string
    shortDescription: string
    url: string
    hits: number
    author: string
    created: string
    slug: string
    category: Array<Category>
}

export interface BlogDetail extends BlogsList {
    content: string
    picture: string | null
    picture_ref: string | null
}