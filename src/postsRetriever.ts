export type PostsRetriever = () => Promise<Post[]>;

interface PostsResponse {
    posts: Post[]
}

export interface Post {
    name: string;
    imageLocation: string;
}

let host = '';

if (process.env.REACT_APP_STAGE === 'production') {
    host = 'http://davidebotti.com/api'
} else {
    host = '/api'
}

export const RestPostsRetriever: PostsRetriever = async (): Promise<Post[]> => {
    const response: PostsResponse = await fetch(`${host}/posts`)
        .then(r => r.json() as any as PostsResponse);
    return response.posts;
}
