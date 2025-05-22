import { Redirect, Route } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { cog, flash, list } from 'ionicons/icons';

import BibleQuotePage from './BibleQuote';
import GitaQuotePage from './GitaQuote';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/bible" render={() => <BibleQuotePage />} exact={true} />
        <Route path="/gita" render={() => <GitaQuotePage />} exact={true} />
        <Route path="" render={() => <Redirect to="/bible" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="bible" href="/bible">
          <IonIcon icon={flash} />
          <IonLabel>Bible</IonLabel>
        </IonTabButton>
        <IonTabButton tab="gita" href="/gita">
          <IonIcon icon={list} />
          <IonLabel>Gita</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
