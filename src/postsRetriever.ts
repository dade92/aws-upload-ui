import {isLocalEnv} from "./index";

export type PostsRetriever = () => Promise<Post[]>;

interface PostsResponse {
    posts: Post[]
}

export interface Post {
    name: string;
    imageLocation: string;
}

let host = '';

if (isLocalEnv()) {
    host = '/api';
} else {
    host = 'http://davidebotti.com/api';
}

export const RestPostsRetriever: PostsRetriever = async (): Promise<Post[]> => {
    const response: PostsResponse = await fetch(`${host}/posts`)
        .then(r => r.json() as any as PostsResponse);
    return response.posts;
}
