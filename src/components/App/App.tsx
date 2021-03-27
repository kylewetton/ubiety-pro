import React, {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import World from '../World';
import {thunkProductLoadMaterials, thunkProductLoadModel} from '../../store/product/thunks';
import {getActiveSection, getProductModelPath, getProductStampaPos, getProductStampaStyle} from '../../store/product/selectors';
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
import {productSetStampaPos, productSetStampaStyle } from '../../store/product/actions';
import StampaColorPicker from '../StampaColorPicker';
import ScaffoldInitialsButtons from '../../layout/ScaffoldInitialsButtons';

/**
 * 
 * @todo
 * -    Make responsive
 * -    Port to WordPress
 * -    Test real data
 * -    Dual custom image
 * -    Output to ecommerce store
 * -    Save custom image / custom text
 */

const App: React.FC = () => {

    const dispatch = useDispatch();
    const MODEL_PATH = useSelector(getProductModelPath);
    const [activeSection] = useSelector(getActiveSection);
    const currentActiveStage = useSelector(interfaceGetActiveStage);
    const stampaPos = useSelector(getProductStampaPos);
    const stampaStyle = useSelector(getProductStampaStyle);
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
                    {currentActiveStage === 'initials' && 
                        <ScaffoldInitialsButtons>
                            <article>
                                <Button boldupper color={stampaPos === '1' ? 'green' : 'mint'} big onClick={() => dispatch(productSetStampaPos('1'))}>
                                    {intl.formatMessage({id : 'stage.initials.button.left'})}
                                </Button>
                                <Button boldupper color={stampaPos === '1' ? 'mint' : 'green'} big onClick={() => dispatch(productSetStampaPos('2'))}>
                                    {intl.formatMessage({id : 'stage.initials.button.right'})}
                                </Button>
                            </article>
                            
                            <article>
                                <StampaColorPicker />
                                <Button boldupper color={stampaStyle === 'printed' ? 'green' : 'mint'} big onClick={() => dispatch(productSetStampaStyle('printed'))}>
                                    {intl.formatMessage({id : 'stage.initials.button.style-print'})}
                                </Button>
                                <Button boldupper color={stampaStyle === 'printed' ? 'mint' : 'green'} big onClick={() => dispatch(productSetStampaStyle('stitched'))}>
                                    {intl.formatMessage({id : 'stage.initials.button.style-stitch'})}
                                </Button>
                            </article>
                        </ScaffoldInitialsButtons>
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