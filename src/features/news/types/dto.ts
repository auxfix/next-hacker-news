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
