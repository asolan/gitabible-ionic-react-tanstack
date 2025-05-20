export interface BibleVersion {
  id: string;
  name: string;
};

export interface BibleBook {
  id: string;
  name: string;
  url: string;
};

export interface BibleQuote {
  reference: string;
  text: string;
  version: string;
  verses: Array<{
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
};

export interface GitaVersion {
  id: string;
  name: string;
};

export interface GitaChapter {
  id: number;
  name: string;
  slug: string;
  name_transliterated: string;
  name_translated: string;
  verses_count: number;
  chapter_number: number;
  name_meaning: string;
  chapter_summary: string;
  chapter_summary_hindi: string;
};

export interface GitaQuote {
  id: number;
  verse_number: number;
  chapter_number: number;
  text: string;
  translations: Array<{
    id: number;
    description: string;
    author_name: string;
    language: string;
  }>;
  commentaries: Array<{
    id: number;
    description: string;
    author_name: string;
    language: string;
  }>
};
