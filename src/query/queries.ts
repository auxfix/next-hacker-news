import rundom_images from '@/features/news/assets/img/rundom_huckers_images';
import { HackerStoryDTO, HackerStory_Dto_to_Internal, UserDTO } from '@/types';
import { getRundomArray, getRundomItemsFromArray } from '@/utils';


export const getNewsQuery = async () => {
    const topNews = await fetch(process.env.HACKER_API + '/topstories.json').then(data => data.json());
    const rundom_10_news = getRundomItemsFromArray(topNews, 10);
    const rundom_image_indexes = getRundomArray(10);

    let newsIndex = 0;

    const internalNews = Array(10);

    for (const id of rundom_10_news) {
      const serverNewsItem: HackerStoryDTO = await fetch(process.env.HACKER_API + `/item/${id}.json`).then(data => data.json());
      const userId: string = serverNewsItem.by;
      const serverUser: UserDTO = await fetch(process.env.HACKER_API + `/user/${userId}.json`).then(data => data.json());;
      const internalNewsItem = HackerStory_Dto_to_Internal(serverNewsItem);
      internalNewsItem.img = rundom_images[rundom_image_indexes[newsIndex]].src; 
      internalNewsItem.karma = serverUser.karma;
      internalNewsItem.num = newsIndex; 
      newsIndex++;

      internalNews.push(internalNewsItem);
    }

    return internalNews;
}