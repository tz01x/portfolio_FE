import { atom } from 'nanostores';
import configs from '../configs.json';

export interface IComments {
    username: string;
    message: string;
    id: number;
    created: string;
}

export const commentsListStore = atom<IComments[]>([]);

export const fetchComments = async (blog_slug: string) => {
    try {
        const data = await fetch(configs.BASE_API + "/api/blog-comments/" + blog_slug).then(response => response.json())
        commentsListStore.set([...data]);
    } catch (error) {
        console.error(error);
    }

}
