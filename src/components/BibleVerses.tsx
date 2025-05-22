import * as react from '@ionic/react';

const BibleVerses: React.FC<any> = (props) => {
  console.log('Bible Quote:', props.data);
  if(!props.data || !props.data.verses) {
    return (<react.IonCard>
              <react.IonCardContent>Loading...</react.IonCardContent>
            </react.IonCard>);
  }


  return (<react.IonCard>
    <react.IonCardHeader>
      <react.IonCardTitle>{props.data.id}</react.IonCardTitle>
    </react.IonCardHeader>
    <react.IonCardContent>
      <react.IonList>
        {props.data.verses.map(v => <react.IonItem>
          <react.IonLabel>
            <div>{v.chapter}:{v.verse} {v.text}</div>
          </react.IonLabel>
        </react.IonItem>)
      }
      </react.IonList>
    </react.IonCardContent>
  </react.IonCard>
)}

export default BibleVerses;
