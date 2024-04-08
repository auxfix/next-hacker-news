import { StaticImageData } from 'next/image';

export * from './common';
export * from './state';
export * from '@/features/news/types';

export interface HackerStory {
    authorId: string;
    id: number;
    img?: string | null;
    karma?: number | null; 
    num?: number | null;
    score: number;
    time: number;
    title: string;
    url?: string | null;
  }
  
  export interface User {
    about: string;
    created: number;
    id: string;
    karma: number;
  }

  export interface HackerStoryDTO {
    by: string;
    id: number;
    score: number;
    time: number;
    title: string;
    url: string;
  }
  
  export interface UserDTO {
    about: string;
    created: number;
    id: string;
    karma: number;
  }

export function HackerStory_Dto_to_Internal(dto: HackerStoryDTO): HackerStory {
  return {
    id: dto.id,
    title: dto.title,
    url: dto.url,
    time: dto.time,
    score: dto.score,
    authorId: dto.by,
  };
}

export function User_Dto_to_Internal(dto: UserDTO): User {
  return {
    id: dto.id,
    created: dto.created,
    karma: dto.karma,
    about: dto.about,
  };
}