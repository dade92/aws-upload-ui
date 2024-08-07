import React, {useEffect} from 'react';
import {Documents} from "./Documents";
import {RestFileUpload} from "./fileUpload";
import {RestPostsRetriever} from "./postsRetriever";
import styled from "styled-components";

const GeneralWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
`

const App: React.FC = () => {

    return <GeneralWrapper>
        <Documents fileUpload={RestFileUpload} postsRetriever={RestPostsRetriever}/>
    </GeneralWrapper>
}

export default App;
