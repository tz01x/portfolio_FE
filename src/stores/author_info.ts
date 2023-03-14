import { atom, map } from 'nanostores';
import configs from '../configs.json';


interface Social {
    id: number
    name: string
    title: string
    link: string
    svg: string
}

export interface AuthorInfo {
    email: string
    username: string
    about: string
    about_sort: string
    socials: Social[]
    cv_url: string
    photo_url: string
}

export const authorInfoStore = map<AuthorInfo>();
export const getAuthorInfo = async () => {
    try {


        const data = await fetch(configs.BASE_API + '/api/get-author').then((response) => response.json());
        authorInfoStore.set(data);



    } catch (error) {
        console.log("error at getAuthorInfo: ", error);
    }

    return authorInfoStore.get();
}