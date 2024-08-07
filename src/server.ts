import {createServer, Response, Server} from 'miragejs';

const translationsResponse = {
    translations: {
        'appflow.customerData.hi': 'Hi',
        'appflow.needHelp.called': 'Need help called!',
        'appflow.needHelp.title': 'Need help?',
        'appflow.customerData.warning': 'Warning',
        'appflow.customerData.t_and_c': 'Accept t&c',
        'appflow.customerData.alias': 'Your alias',
        'appflow.customerData.actions': 'Actions',
        'appflow.customerData.submit': 'Submit',
        'appflow.customerData.undo': 'Undo',
        'appflow.customerData.areyousure': 'Are you sure???',
        'appflow.customerData.confirmModal': 'By clicking on confirm you confirm the operation',
        'appflow.customerData.confirm': 'Confirm',
        'appflow.customerData.disagree': 'Disagree',
        'appflow.customerData.thankyoumessage': 'Thanks for your selection ',
        'appflow.customerData.restart': 'Restart',
        'appflow.customerData.photo': 'Upload your picture',
        'appflow.customerData.alertmessage': 'Input must be greater than two letters',
        'appflow.customerData.noUser': 'Error while loading user information',
        'appflow.customerData.next': 'Next',
        'appflow.loading.loading_message': 'Please wait while we complete the requested operation'
    }
}

const userResponse = {
    name: 'Sergio',
    surname: 'Botti'
};

const chuckNorrisResponse = {
    value: 'This is a joke'
}

const initResponseArray = {
    users: [
        {
            name: 'Sergio',
            surname: 'Botti',
            data: {
                profile: 'test'
            }
        },
        {
            name: 'Elena',
            surname: 'Botti',
            data: {
                profile: 'test2'
            }
        },
        {
            name: 'Paola',
            surname: 'Meroni',
            data: {
                profile: 'test3'
            }
        },
        {
            name: 'Paola',
            surname: 'Meroni',
            data: {
                profile: 'test3'
            }
        },
        {
            name: 'Paola',
            surname: 'Meroni',
            data: {
                profile: 'test3'
            }
        },
    ]
};


const findUser200 = (): Response => new Response(200, {}, userResponse);
const findUser500 = (): Response => new Response(500, {}, {});
const translations200 = (): Response => new Response(200, {}, translationsResponse);
const chuckNorris200 = (): Response => new Response(200, {}, chuckNorrisResponse);
const init200Array = (): Response => new Response(200, {}, initResponseArray);
const userListEmpty = (): Response => new Response(200, {}, {users: []});
export const init500Array = (): Response => new Response(500, {}, {});
const createCustomer204 = (): Response => new Response(204);
const wsMessage = (): Response => new Response(200);
const createCustomer400 = (): Response => new Response(400, {}, {});

export const server: () => Server = () =>
    createServer({
        logging: true,
        routes() {
            this.get('/find', findUser200);
            this.get('/translations/:language', translations200);
            this.get('/retrieveUsers', init200Array);
            this.post('/insert', createCustomer204, {timing: 3000});
        },
    });