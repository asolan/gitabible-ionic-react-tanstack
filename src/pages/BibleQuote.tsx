import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import * as react from '@ionic/react';
import type { BibleQuote } from '../lib/Types';
import { bibleVersions, bibleBooks } from '../lib/Metadata';
import  v from '../components/BibleVerses';
import BibleVerses from '../components/BibleVerses';

const BibleQuotePage: React.FC = () => {
  const [version, setVersion] = useState<string>('kjv');
  const [book, setBook] = useState<string>('JHN');
  const [chapter, setChapter] = useState<string>('3');
  const [verse, setVerse] = useState<string>('');
  const [customPath, setCustomPath] = useState<string>('');

  const fetchBibleQuote = async (): Promise<BibleQuote> => {
    let url = `https://bible-api.com/data/${version}`;
    
    if (customPath) {
      url += `/${customPath}`;
    } else if (book) {
      url += `/${book}`;
      if (chapter) {
        url += `/${chapter}`;
        if (verse) {
          url += `/${verse}`;
        }
      }
    }

    const response = await axios.get<BibleQuote>(url);
    return response.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery<BibleQuote, AxiosError>({
    queryKey: ['bibleQuote', version, book, chapter, verse, customPath],
    queryFn: fetchBibleQuote,
  });

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
          <react.IonTitle>Bible Quotes</react.IonTitle>
        </react.IonToolbar>
      </react.IonHeader>

      <react.IonContent fullscreen>
        <react.IonHeader collapse="condense">
          <react.IonToolbar>
            <react.IonTitle size="large">Bible Quotes</react.IonTitle>
          </react.IonToolbar>
        </react.IonHeader>

        <form onSubmit={handleSubmit}>
          <react.IonList>
            {/* <react.IonItem>
              <react.IonLabel position="stacked">Bible Version</react.IonLabel>
              <react.IonSelect 
                value={version} 
                onIonChange={e => setVersion(e.detail.value!)}
                interface="action-sheet"
              >
                {bibleVersions.map(v => (
                  <react.IonSelectOption key={v.id} value={v.id}>{v.name}</react.IonSelectOption>
                ))}
              </react.IonSelect>
            </react.IonItem> */}

            <react.IonItem>
              <react.IonLabel position="stacked">Book</react.IonLabel>
              <react.IonSelect 
                value={book} 
                onIonChange={e => setBook(e.detail.value!)}
                interface="action-sheet"
              >
                {bibleBooks.map(b => (
                  <react.IonSelectOption key={b.id} value={b.id}>{b.name}</react.IonSelectOption>
                ))}
              </react.IonSelect>
            </react.IonItem>

            <react.IonItem>
              <react.IonLabel position="stacked">Chapter</react.IonLabel>
              <react.IonInput
                type="text"
                value={chapter}
                onIonChange={e => setChapter(e.detail.value!)}
              />
            </react.IonItem>

            <react.IonItem>
              <react.IonLabel position="stacked">Verse (optional)</react.IonLabel>
              <react.IonInput
                type="text"
                value={verse}
                onIonChange={e => setVerse(e.detail.value!)}
              />
            </react.IonItem>

            {/* <react.IonItem>
              <react.IonLabel position="stacked">Custom Path (e.g., "john/3/16")</react.IonLabel>
              <react.IonInput
                type="text"
                value={customPath}
                onIonChange={e => setCustomPath(e.detail.value!)}
                placeholder="book/chapter/verse"
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
        
        <BibleVerses data={data} />

      </react.IonContent>
    </react.IonPage>
  );
};

export default BibleQuotePage;
