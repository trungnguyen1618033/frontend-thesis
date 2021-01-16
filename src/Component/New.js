import Title from './Title';
import StepsSteps from './StepsSteps';
import { useSelector } from 'react-redux';

function New(props) {

    let todos = useSelector(state => state)
    return (
        <>
            <Title />
            <StepsSteps data={todos} />
        </>
    );
}

export default New;