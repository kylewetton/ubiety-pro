import React, {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import World from '../World';
import {thunkProductLoadMaterials, thunkProductLoadModel} from '../../store/product/thunks';
import {getProductModelPath} from '../../store/product/selectors';
import SwatchTray from '../SwatchTray';
import Selector from '../Selector';
import ControlPanel from '../../layout/ControlPanel';
import ImageEditor from '../ImageEditor';
import SelectorTray from '../../layout/SelectorTray';

const App: React.FC = () => {

    
    const dispatch = useDispatch();
    const MODEL_PATH = useSelector(getProductModelPath);
    
    useEffect(() => {
        dispatch(thunkProductLoadMaterials());
        dispatch(thunkProductLoadModel());
    }, [dispatch]);

    if (!MODEL_PATH)
        return <p>Fetching data...</p>
        
    return (
        <Suspense fallback={<p>Building world...</p>}>
            <ImageEditor />
            <ControlPanel>
                <SelectorTray>
                    <Selector type={`material`} />
                </SelectorTray>
                <SwatchTray />
            </ControlPanel>
                <World model={MODEL_PATH} />
        </Suspense>
    )
}

export default App;