import React, {Suspense, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import World from '../World';
import {thunkProductLoadMaterials} from '../../store/product/thunks';

const App: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkProductLoadMaterials());
    }, [dispatch]);

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <World />
        </Suspense>
    )
}

export default App;