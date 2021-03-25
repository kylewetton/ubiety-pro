import React, {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import World from '../World';
import {thunkProductLoadMaterials, thunkProductLoadModel} from '../../store/product/thunks';
import {getActiveSection, getProductModelPath} from '../../store/product/selectors';
import SwatchTray from '../SwatchTray';
import Selector from '../Selector';
import SectionSelector from '../SectionSelector';
import ControlPanel from '../../layout/ControlPanel';
import ImageEditor from '../ImageEditor';
import TextEditor from '../TextEditor';
import SelectorTray from '../../layout/SelectorTray';
import Button from '../Button';
import { interfaceToggleModal } from '../../store/interface/actions';

const App: React.FC = () => {

    
    const dispatch = useDispatch();
    const MODEL_PATH = useSelector(getProductModelPath);
    const [activeSection] = useSelector(getActiveSection);
    
    useEffect(() => {
        dispatch(thunkProductLoadMaterials());
        dispatch(thunkProductLoadModel());
    }, [dispatch]);

    const _handleOpenCustomModal = () => {
        dispatch(interfaceToggleModal({id: 'customImage', status: 'open'}));
    }

    const _handleOpenCustomText = () => {
        dispatch(interfaceToggleModal({id: 'customText', status: 'open'}));
    }


    if (!MODEL_PATH)
        return <p>Fetching data...</p>
        
    return (
        <Suspense fallback={<p>Building world...</p>}>
                <ImageEditor />
                <TextEditor />
            <ControlPanel>
                <SelectorTray>
                    <SectionSelector color={'blue'} />
                    <Selector type={`material`} />
                    {activeSection.tag === 'quarters' && 
                    <>
                        <Button big onClick={_handleOpenCustomModal}>
                            Custom image
                        </Button>
                        <Button big onClick={_handleOpenCustomText}>
                            Custom text
                        </Button>
                    </>
                    }
                </SelectorTray>
                <SwatchTray />
            </ControlPanel>
                <World model={MODEL_PATH} />
        </Suspense>
    )
}

export default App;