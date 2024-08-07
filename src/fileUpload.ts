import {isLocalEnv} from "./Utils";

export type FileUpload = (file: File, onUploadCompleted: (location: string) => void, onUploadError: () => void) => void;

interface UploadResponse {
    imageLocation: string;
}

let host = '';

if (process.env.REACT_APP_STAGE === 'production') {
    host = 'http://davidebotti.com/api'
} else {
    host = '/api'
}

export const RestFileUpload: FileUpload = (file: File, onUploadCompleted: (location: string) => void, onUploadError: () => void) => {
    const formData = new FormData();

    formData.append(
        "file",
        file,
        file.name
    );
    fetch(`${host}/upload`, {
        method: 'POST',
        body: formData,
    }).then((r) =>
        r.json() as any as UploadResponse
    ).then(r => {
        onUploadCompleted(r.imageLocation);
    }).catch(() => {
        onUploadError();
    })
}