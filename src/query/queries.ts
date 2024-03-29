import rundom_images from '@/features/news/assets/img/rundom_huckers_images';
import { HackerStoryDTO, HackerStory_Dto_to_Internal } from '@/types';
import { getRundomArray, getRundomItemsFromArray } from '@/utils';

const hackerStoryMock =  {
    authorId: 12,
    id: 1,
    img: rundom_images[2].src,
    karma: 3,
    num: 3,
    score: 10,
    time: 1708618644080,
    title: 'exiting news',
    url: 'https://www.google.com/search?q=hacker+news'
  }

export const getNewsQuery = async () => {
    const topNews = await fetch(process.env.HACKER_API + '/topstories.json').then(data => data.json());
    const rundom_10_news = getRundomItemsFromArray(topNews, 10);
    // const rundom_image_indexes = getRundomArray(10);

    let newsIndex = 0;

    const internalNews = Array(10);

    for (const id of rundom_10_news) {
      const serverNewsItem: HackerStoryDTO = await fetch(process.env.HACKER_API + `/item/${id}.json`).then(data => data.json());
      const internalNewsItem = HackerStory_Dto_to_Internal(serverNewsItem);
      internalNewsItem.img = hackerStoryMock.img; 
      internalNewsItem.karma = hackerStoryMock.karma;
      internalNewsItem.num = hackerStoryMock.num; 
      newsIndex++;

      internalNews.push(internalNewsItem);
    }

    return internalNews;
}