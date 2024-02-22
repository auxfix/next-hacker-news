export interface HackerStory {
  authorId: string;
  id: number;
  img?: string;
  karma?: number; 
  num?: number;
  score: number;
  time: number;
  title: string;
  url: string;
}

export interface User {
  about: string;
  created: number;
  id: string;
  karma: number;
}
