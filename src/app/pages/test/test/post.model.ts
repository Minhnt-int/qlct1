export interface Post {
  caption?: string;
  images: string[];
  user: PostUser;
  createdAt: Date | any;
}

export interface PostUser {
  id: string;
  username: string;
  avatar: string;
}
