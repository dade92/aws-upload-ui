import {render, screen, waitFor} from "@testing-library/react";
import {Upload} from "./Upload";

describe('Upload', () => {
    it('should render posts correctly', async () => {
        let fileUpload = jest.fn();
        let postsRetriever = jest.fn(() => Promise.resolve(
            [{
                name: 'image1',
                imageLocation: ''
            }]
        ));

        render(<Upload fileUpload={fileUpload} postsRetriever={postsRetriever}/>);

        let wrapper = screen.getByTestId('uploadWrapper');

        await waitFor(() => {
            expect(wrapper).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByTestId('image-image1')).toBeVisible();
        });
    });
})