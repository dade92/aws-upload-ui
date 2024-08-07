import {render, screen, waitFor} from "@testing-library/react";
import {Upload} from "./Upload";

describe('Upload', () => {
    it('should render posts correctly', () => {
        let fileUpload = jest.fn();
        let postsRetriever = jest.fn(() => Promise.resolve(
            [{
                name: 'image1',
                imageLocation: ''
            }]
        ));

        render(<Upload fileUpload={fileUpload} postsRetriever={postsRetriever}/>);

        let wrapper = screen.getByTestId('uploadWrapper');

        waitFor(() => {
            expect(wrapper).toBeInTheDocument();
            expect(screen.getByTestId('image-image1')).toBeVisible();
        });
    });
})