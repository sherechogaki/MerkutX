import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

export async function POST(request: Request) {
  try {
    const { summary } = await request.json();

    if (!GOOGLE_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
      return NextResponse.json({ error: 'Google API bilgileri eksik.' }, { status: 500 });
    }

    const query = summary;

    const searchUrl = new URL('https://www.googleapis.com/customsearch/v1');
    searchUrl.searchParams.append('key', GOOGLE_API_KEY);
    searchUrl.searchParams.append('cx', GOOGLE_SEARCH_ENGINE_ID);
    searchUrl.searchParams.append('q', query);
    searchUrl.searchParams.append('num', '5');
    searchUrl.searchParams.append('lr', 'lang_tr');

    const response = await fetch(searchUrl.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API Hatası:', errorText);
      return NextResponse.json({ error: 'Google araması başarısız.' }, { status: 500 });
    }

    const results = await response.json();

    const articles = results.items?.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    })) || [];

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Hata:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
