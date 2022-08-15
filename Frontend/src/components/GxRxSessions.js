import React, {useState} from 'react';

import { TabPanel, TabView } from 'primereact/tabview';
import GxSessions from './GxSessions';
import RxSessions from './RxSessions';


const GxRxSessions = () => {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>


        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="GxSessions">
                <GxSessions>
                </GxSessions>
            </TabPanel>
            <TabPanel header="GxSessions2">
                <RxSessions> </RxSessions>
            </TabPanel>

            
        </TabView>
    </div>
  )

  
  
};

export default GxRxSessions;