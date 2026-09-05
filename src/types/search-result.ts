export interface SearchResult {
  id: string;
  picture?: string;
  name: string;
  title: string;
  city: string;
  uf: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  portfolio?: string;
  chunks: { content: string; match: number }[];
  questionIdeas: { question: string; answer: string }[];
}