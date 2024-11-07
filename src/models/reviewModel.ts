export interface ReviewInterface {
  author: string;
  content: string;
  create_at: string;
  author_details: { rating: number | null };
  id: string;
  updated_at: string;
  url: string;
}
