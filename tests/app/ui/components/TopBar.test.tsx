import { render } from "@testing-library/react";
import { TopBar } from "../../../../src/app/ui/components/TopBar";

describe('test para el componente TopBar', () => {

    test('match snapshot', () => {
        const { asFragment } = render( <TopBar />);
        expect(asFragment()).toMatchSnapshot();
    });


    test()

});