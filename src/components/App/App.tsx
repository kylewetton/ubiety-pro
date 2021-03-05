import React, {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import World from '../World';
import {thunkProductLoadMaterials, thunkProductLoadModel} from '../../store/product/thunks';
import {getIsLoading, getProductModelPath} from '../../store/product/selectors';
import SwatchTray from '../SwatchTray';
import Selector from '../Selector';
import ControlPanel from '../../layout/ControlPanel'

const App: React.FC = () => {

    const dispatch = useDispatch();
    const MODEL_PATH = useSelector(getProductModelPath);
    const IS_LOADING = useSelector(getIsLoading);
    
    useEffect(() => {
        dispatch(thunkProductLoadMaterials());
        dispatch(thunkProductLoadModel());
    }, [dispatch]);

    if (IS_LOADING)
        return <p>Fetching data...</p>
        
    return (
        <Suspense fallback={<p>Building world...</p>}>
            <ControlPanel>
                <Selector type={`material`} />
                <SwatchTray />
            </ControlPanel>
            <World model={MODEL_PATH} />
        </Suspense>
    )
}

export default App;