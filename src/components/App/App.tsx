import React, {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import World from '../World';
import {thunkProductLoadMaterials, thunkProductLoadModel} from '../../store/product/thunks';
import {getProductModelPath} from '../../store/product/selectors';
import SwatchTray from '../SwatchTray';
import Selector from '../Selector';
import ControlPanel from '../../layout/ControlPanel';
import { getActiveSection } from '../../store/product/selectors';

const App: React.FC = () => {

    const dispatch = useDispatch();
    const MODEL_PATH = useSelector(getProductModelPath);
    const [ACTIVE_SECTION] = useSelector(getActiveSection);
    
    useEffect(() => {
        dispatch(thunkProductLoadMaterials());
        dispatch(thunkProductLoadModel());
    }, [dispatch]);

    if (!MODEL_PATH)
        return <p>Fetching data...</p>
        
    return (
        <Suspense fallback={<p>Building world...</p>}>
            <ControlPanel>
                <Selector activeSection={ACTIVE_SECTION} type={`material`} />
                <SwatchTray />
            </ControlPanel>
            <World model={MODEL_PATH} />
        </Suspense>
    )
}

export default App;