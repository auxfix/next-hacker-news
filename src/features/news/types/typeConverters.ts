import { HackerStory, User } from '@/features/news/types';
import { HackerStoryDTO, UserDTO } from '@/features/news/types/dto';

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
