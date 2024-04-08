import { saveNews } from "@/query/serverQueries";

export async function POST(req: any){
  const { news } = await req.json();
  await saveNews(news);

  return Response.json('ok')
}