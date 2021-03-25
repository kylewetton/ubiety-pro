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
import StageSelectorSidebar from '../../layout/StageSelectorSidebar';
import StageSelector from '../StageSelector';
import Button from '../Button';
import { interfaceSetActiveStage, interfaceToggleModal } from '../../store/interface/actions';
import { interfaceGetActiveStage } from '../../store/interface/selectors';
import LoadingOverlay from '../LoadingOverlay';

const App: React.FC = () => {

    
    const dispatch = useDispatch();
    const MODEL_PATH = useSelector(getProductModelPath);
    const [activeSection] = useSelector(getActiveSection);
    const currentActiveStage = useSelector(interfaceGetActiveStage);
    
    useEffect(() => {
        dispatch(thunkProductLoadMaterials());
        dispatch(thunkProductLoadModel());
    }, [dispatch]);

    useEffect(() => {
        if (activeSection) {
            if ((activeSection.tag !== 'quarters' && currentActiveStage === 'customText' )|| (activeSection.tag !== 'quarters' && currentActiveStage === 'customImage'))
                dispatch(interfaceSetActiveStage('materials'))
        }
    }, [activeSection, currentActiveStage, dispatch])

    const _handleOpenCustomModal = () => {
        dispatch(interfaceToggleModal({id: 'customImage', status: 'open'}));
    }

    const _handleOpenCustomText = () => {
        dispatch(interfaceToggleModal({id: 'customText', status: 'open'}));
    }


    if (!MODEL_PATH)
        return <LoadingOverlay message={'Spinning up...'} />
        
    return (
        <Suspense fallback={<LoadingOverlay message={'Building world...'} />}>
                <ImageEditor />
                <TextEditor />
            <ControlPanel>
                <SelectorTray>
                {currentActiveStage === 'materials'  &&
                    <SectionSelector color={'blue'} />
                }
                <Selector type={`material`} />

                    {activeSection.tag === 'quarters' && 
                    <>
                    {currentActiveStage === 'customImage' && 
                        <Button boldupper color={'blue'} big onClick={_handleOpenCustomModal}>
                            Add/Edit custom image
                        </Button>
                    }
                    {currentActiveStage === 'customText' && 
                        <Button boldupper color={'blue'} big onClick={_handleOpenCustomText}>
                            Add/Edit custom text
                        </Button>
                    }
                    </>
                    }
                </SelectorTray>
                <SwatchTray />
            </ControlPanel>
                <World model={MODEL_PATH} />
                <StageSelectorSidebar>
                    <StageSelector active={currentActiveStage === 'materials'} onClick={() => dispatch(interfaceSetActiveStage('materials'))} >Materials</StageSelector>
                    <StageSelector active={currentActiveStage === 'initials'} onClick={() => dispatch(interfaceSetActiveStage('initials'))} >Initials</StageSelector>
                    {activeSection.tag === 'quarters' && 
                    <>
                        <StageSelector active={currentActiveStage === 'customText'} onClick={() => dispatch(interfaceSetActiveStage('customText'))} >Custom Text</StageSelector>
                        <StageSelector active={currentActiveStage === 'customImage'} onClick={() => dispatch(interfaceSetActiveStage('customImage'))} >Custom Image</StageSelector>
                    </>
                    }
                </StageSelectorSidebar>
        </Suspense>
    )
}

export default App;