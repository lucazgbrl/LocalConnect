export default interface Service {
  id: string;
  name: string;
  description?: string;
  imageSrc: string;
  rating: number;
  tags: string[];
}
