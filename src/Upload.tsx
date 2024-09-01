import React, {FC, useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import styled from "styled-components";
import {FileUpload} from "./fileUpload";
import {Post, PostsRetriever} from "./postsRetriever";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const HorizontalWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: space-between;
`

interface Props {
    fileUpload: FileUpload
    postsRetriever: PostsRetriever
}

export const Upload: FC<Props> = ({fileUpload, postsRetriever}) => {
    const [file, setFile] = useState<File | null>();
    const [successFeedback, setSuccessFeedback] = useState<boolean>();
    const [errorFeedback, setErrorFeedback] = useState<boolean>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const fetchPosts = () => {
        postsRetriever()
            .then(posts => setPosts(posts))
            .catch(e => console.log('Error retrieving posts!'))
    };

    useEffect(() => {
        fetchPosts();
    }, [])

    const onFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const onUploadCompleted = () => {
        setSuccessFeedback(true);
        setIsUploading(false);
        fetchPosts();
    };

    const onUploadError = () => {
        setErrorFeedback(true);
    }

    const onFileUpload = () => {
        if (file != null) {
            setIsUploading(true);
            fileUpload(file, onUploadCompleted, onUploadError);
        }
    };

    return <Wrapper data-testid={'uploadWrapper'}>
        {errorFeedback && <Alert severity="error">There was an error uploading the image</Alert>}
        <HorizontalWrapper>
            <input
                type="file"
                onChange={onFileChange}
            />
            <LoadingButton loading={isUploading} variant={'contained'} onClick={onFileUpload} data-testid={'upload-button'}>Upload</LoadingButton>
            {successFeedback &&
                <Snackbar open={true} autoHideDuration={2000} onClose={() => setSuccessFeedback(false)}
                          data-testid={'snackbar'}>
                    <Alert severity="success" sx={{width: '100%'}}>
                        Document uploaded successfully
                    </Alert>
                </Snackbar>
            }
        </HorizontalWrapper>
        {
            posts.map(p => {
                return <img
                    src={p.imageLocation}
                    key={p.name}
                    data-testid={`image-${p.name}`}
                    width={400}
                    height={400}
                    alt="Uploaded picture"
                />
            })
        }
    </Wrapper>
}