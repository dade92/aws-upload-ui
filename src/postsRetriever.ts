export type PostsRetriever = () => Promise<Post[]>;

interface PostsResponse {
    posts: Post[]
}

export interface Post {
    name: string;
    imageLocation: string;
}

export const RestPostsRetriever: PostsRetriever = async (): Promise<Post[]> => {
    const response: PostsResponse = await fetch(`/posts`)
        .then(r => r.json() as any as PostsResponse);
    return response.posts;
}
