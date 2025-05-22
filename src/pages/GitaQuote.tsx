import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import * as react from '@ionic/react';
import type { GitaQuote } from '../lib/Types';
import { gitaVersions, gitaChapters } from '../lib/Metadata';
import GitaVerses from '../components/GitaVerses';

const GitaQuotePage: React.FC = () => {
  const [chapter, setChapter] = useState<number>(1);
  const [verse, setVerse] = useState<number>(0);

  const fetchGitaQuote = async (): Promise<GitaQuote> => {
    let url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters`;
    
    if (chapter) {
      url += `/${chapter}/verses/`;
      if (verse) {
        url += `/${verse}`;
      }
    }

    const headers = { 'X-Rapidapi-Key': '54a29e5c34msh3a8da6ad7fb4e97p147214jsn3e8fd03c460c',
      'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
      'Content-Type': 'application/json'
    };
    const response = await axios.get<GitaQuote>(url, {headers: headers});
    return response.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery<GitaQuote, AxiosError>({
    queryKey: ['gitaQuote', chapter, verse],
    queryFn: fetchGitaQuote,
  });

  console.log('Gita Quote:', data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <react.IonPage> 
      <react.IonHeader>
        <react.IonToolbar>
          <react.IonButtons slot="start">
            <react.IonMenuButton />
          </react.IonButtons>
          <react.IonTitle>Gita Quotes</react.IonTitle>
        </react.IonToolbar>
      </react.IonHeader>

      <react.IonContent fullscreen>
        <react.IonHeader collapse="condense">
          <react.IonToolbar>
            <react.IonTitle size="large">Gita Quotes</react.IonTitle>
          </react.IonToolbar>
        </react.IonHeader>

        <form onSubmit={handleSubmit}>
          <react.IonList>

            <react.IonItem>
              <react.IonLabel position="stacked">Chapter</react.IonLabel>
              <react.IonSelect 
                value={chapter} 
                onIonChange={e => setChapter(e.detail.value!)}
                interface="action-sheet"
              >
                {gitaChapters && gitaChapters.map(b => (
                  <react.IonSelectOption key={b.id} value={b.id}>{b.name_translated}</react.IonSelectOption>
                ))}
              </react.IonSelect>
            </react.IonItem>

            {/* <react.IonItem>
              <react.IonLabel position="stacked">Verse (optional)</react.IonLabel>
              <react.IonInput
                type="number"
                value={verse}
                onIonChange={e => setVerse(e.detail.value!)}
              />
            </react.IonItem> */}

          </react.IonList>

          <div style={{ padding: '16px' }}>
            <react.IonButton expand="block" type="submit">Get Quote</react.IonButton>
          </div>
        </form>

        <react.IonLoading isOpen={isLoading} message="Loading..." />

        <react.IonAlert
          isOpen={isError}
          onDidDismiss={() => {}}
          header="Error"
          message={error?.message}
          buttons={['OK']}
        />
        <GitaVerses data={data} />
      </react.IonContent>
    </react.IonPage>
  );
};

export default GitaQuotePage;
