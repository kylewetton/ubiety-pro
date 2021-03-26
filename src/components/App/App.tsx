import React, {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import World from '../World';
import {thunkProductLoadMaterials, thunkProductLoadModel} from '../../store/product/thunks';
import {getActiveSection, getProductModelPath} from '../../store/product/selectors';
import {useIntl} from 'react-intl';
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
    const intl = useIntl();
    
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
        return <LoadingOverlay message={intl.formatMessage({id : 'loading.message.fetching-data'})} />
        
    return (
        <Suspense fallback={<LoadingOverlay message={intl.formatMessage({id : 'loading.message.loading-model'})} />}>
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
                            {intl.formatMessage({id : 'stage.customImage.button.add-edit'})}
                        </Button>
                    }
                    {currentActiveStage === 'customText' && 
                        <Button boldupper color={'blue'} big onClick={_handleOpenCustomText}>
                            {intl.formatMessage({id : 'stage.customText.button.add-edit'})}
                        </Button>
                    }
                    </>
                    }
                </SelectorTray>
                <SwatchTray />
            </ControlPanel>
                <World model={MODEL_PATH} />
                <StageSelectorSidebar>
                    <StageSelector active={currentActiveStage === 'materials'} onClick={() => dispatch(interfaceSetActiveStage('materials'))} >{intl.formatMessage({id : 'stage.materials.title'})}</StageSelector>
                    <StageSelector active={currentActiveStage === 'initials'} onClick={() => dispatch(interfaceSetActiveStage('initials'))} >{intl.formatMessage({id : 'stage.initials.title'})}</StageSelector>
                    {activeSection.tag === 'quarters' && 
                    <>
                        <StageSelector active={currentActiveStage === 'customText'} onClick={() => dispatch(interfaceSetActiveStage('customText'))} >{intl.formatMessage({id : 'stage.customText.title'})}</StageSelector>
                        <StageSelector active={currentActiveStage === 'customImage'} onClick={() => dispatch(interfaceSetActiveStage('customImage'))} >{intl.formatMessage({id : 'stage.customImage.title'})}</StageSelector>
                    </>
                    }
                </StageSelectorSidebar>
        </Suspense>
    )
}

export default App;