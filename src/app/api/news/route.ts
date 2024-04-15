import rundom_images from '@/features/news/assets/img/rundom_huckers_images';
import { HackerStoryDTO, HackerStory_Dto_to_Internal, UserDTO } from '@/types';
import { getRundomArray } from '@/lib/utils';

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");
    const serverNewsItem: HackerStoryDTO = await fetch(process.env.HACKER_API + `/item/${id}.json`).then(data => data.json());
    const userId: string = serverNewsItem.by;
    const serverUser: UserDTO = await fetch(process.env.HACKER_API + `/user/${userId}.json`).then(data => data.json());;
    const internalNewsItem = HackerStory_Dto_to_Internal(serverNewsItem);
    const rundom_image_indexes = getRundomArray(10);
    internalNewsItem.img = rundom_images[rundom_image_indexes[0]].src; 
    internalNewsItem.karma = serverUser.karma;
   
    return Response.json({ newsItem: internalNewsItem })
  }