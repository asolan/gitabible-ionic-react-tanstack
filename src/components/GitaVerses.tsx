import * as react from '@ionic/react';

const GitaVerses: React.FC<any> = (props) => {
  console.log('Gita Quote:', props.data);
  if(!props.data) {
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
        {props.data.map((v: any) => {
          let translation = v.translations.filter(x => x.language == 'english')[0];
          let commentary = v.commentaries.filter(x => x.language == 'english')[0];  

          return (<react.IonItem key={v.id}>
            <react.IonLabel>
              <div>
                <span key={translation.id}>
                {v.verse_number} {translation.description} ({translation.author_name})
                </span>
              </div>
              {/* <div>
                <span key={translation.id}>
                  {commentary.description} ({commentary.author_name})
                </span>
              </div> */}
            </react.IonLabel>
          </react.IonItem>);
      })}
      </react.IonList>
    </react.IonCardContent>
  </react.IonCard>
)}

export default GitaVerses;
