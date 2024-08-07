import React, {FC, useEffect, useState} from "react";
import {Alert, Button, Snackbar} from "@mui/material";
import styled from "styled-components";
import {FileUpload, RestFileUpload} from "./fileUpload";
import {Post, PostsRetriever, RestPostsRetriever} from "./postsRetriever";

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

const ButtonWithMargin = styled(Button)`
    margin-top: 16px;
`

interface Props {
    fileUpload: FileUpload
    postsRetriever: PostsRetriever
}

export const Documents: FC<Props> = ({fileUpload, postsRetriever}) => {
    const [file, setFile] = useState<File | null>();
    const [successFeedback, setSuccessFeedback] = useState<boolean>();
    const [errorFeedback, setErrorFeedback] = useState<boolean>();
    const [posts, setPosts] = useState<Post[]>([]);

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

    const onUploadCompleted = (location: string) => {
        setSuccessFeedback(true);
        fetchPosts();
    };

    const onUploadError = () => {
        setErrorFeedback(true);
    }

    const onFileUpload = () => {
        if (file != null) {
            fileUpload(file, onUploadCompleted, onUploadError);
        }
    };

    return <Wrapper>
        {errorFeedback && <span>{'There was an error uploading the image'}</span>}
        <HorizontalWrapper>
            <input
                type="file"
                onChange={onFileChange}
            />
            <Button onClick={onFileUpload}/>
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
                    width={400}
                    height={400}
                    alt="Uploaded picture"
                />
            })
        }
    </Wrapper>
}