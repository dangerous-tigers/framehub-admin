export type PostImageViewModel = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt?: string;
  uploadId: string;
};

export type PostViewModel = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: PostImageViewModel[];

  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;

  owner: {
    firstName: string;
    lastName: string;
  };
  likesCount: number;
  isLiked: boolean;
  example?: true;
  avatarWhoLikes: string[];
};
