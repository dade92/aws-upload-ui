import React from 'react';
import {Upload} from "./Upload";
import {RestFileUpload} from "./fileUpload";
import {RestPostsRetriever} from "./postsRetriever";
import styled from "styled-components";

const GeneralWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
`

const App: React.FC = () =>
    <GeneralWrapper>
        <Upload fileUpload={RestFileUpload} postsRetriever={RestPostsRetriever}/>
    </GeneralWrapper>

export default App;
