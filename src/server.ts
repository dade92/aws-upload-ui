import {createServer, Response, Server} from 'miragejs';

const upload = {
    imageLocation: 'https://davide-s3-12345678900000.s3.eu-central-1.amazonaws.com/download.jpeg'
}

const postsResponse = {
    posts: [
        {
            name: 'image 1',
            imageLocation: 'https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA'
        },
        {
            name: 'image 2',
            imageLocation: 'https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA'
        }
    ]
};

const retrievePostsResponse = (): Response => new Response(200, {}, postsResponse);
const uploadResponse = (): Response => new Response(200, {}, upload);

export const server: () => Server = () =>
    createServer({
        logging: true,
        routes() {
            this.get('/api/posts', retrievePostsResponse);
            this.post('/api/upload', uploadResponse);
        },
    });