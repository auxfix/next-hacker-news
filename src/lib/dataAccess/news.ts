import { HackerStory } from '@/types';
import prisma from '../prisma/prisma';

export const getNews: () => Promise<HackerStory[]> = async () => {
  return await prisma.news.findMany();
}

export const saveNews: (news:  HackerStory[]) => Promise<void> = async (news: HackerStory[]) => {
    await prisma.news.createMany({
      data: [
        ...news,
      ],
      skipDuplicates: true, 
    })
}