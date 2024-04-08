import { saveNews, getNews } from "@/query/serverQueries";

export async function POST(req: any){
  const { news } = await req.json();
  await saveNews(news);

  return Response.json('ok')
}

export async function GET(){
  const news = await getNews();

  return Response.json(news);
}