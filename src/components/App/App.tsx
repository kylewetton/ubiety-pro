import React, {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import World from '../World';
import {thunkProductLoadMaterials, thunkProductLoadModel} from '../../store/product/thunks';
import {getProductModelPath} from '../../store/product/selectors';

const App: React.FC = () => {

    const dispatch = useDispatch();
    const MODEL_PATH = useSelector(getProductModelPath);

    useEffect(() => {
        dispatch(thunkProductLoadMaterials());
        dispatch(thunkProductLoadModel());
    }, [dispatch]);

    if (!MODEL_PATH)
        return <p>Loading...</p>
        
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <World model={MODEL_PATH} />
        </Suspense>
    )
}

export default App;