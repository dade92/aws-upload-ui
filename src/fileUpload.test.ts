import {createServer, Server} from "miragejs";
import {uploadResponse200, uploadResponse500} from "./server";
import {RestFileUpload} from "./fileUpload";
import {cleanup, waitFor} from "@testing-library/react";

describe('file upload', () => {
    let mockServer: Server;

    it('should call the callback in case of success', async () => {
        mockServer = createServer({
            logging: true,
            routes() {
                this.post('/api/upload', uploadResponse200);
            },
        });

        const onUploadCompleted = jest.fn();
        const onUploadError = jest.fn();

        RestFileUpload(
            new File([""], "filename", {type: 'text/html'}),
            onUploadCompleted,
            onUploadError
        )

        await waitFor(() => {
            expect(onUploadCompleted).toHaveBeenCalled()
        })
        await waitFor(() => {
            expect(onUploadError).not.toHaveBeenCalled()
        })
    })

    it('should call the error callback in case of any problem', async () => {
        mockServer = createServer({
            logging: true,
            routes() {
                this.post('/api/upload', uploadResponse500);
            },
        });

        const onUploadCompleted = jest.fn();
        const onUploadError = jest.fn();

        RestFileUpload(
            new File([""], "filename", {type: 'text/html'}),
            onUploadCompleted,
            onUploadError
        )

        await waitFor(() => {
            expect(onUploadError).toHaveBeenCalled()
        })
        await waitFor(() => {
            expect(onUploadCompleted).not.toHaveBeenCalled()
        })
    })

    afterEach(() => {
        mockServer.shutdown();
        cleanup();
    })
})