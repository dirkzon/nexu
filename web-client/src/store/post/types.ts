export interface PostState {
    createdAt: Date;
    id: string;
    totalLikes: number;
    createdBy: {
      name: string;
      avatar: {
        url: string;
        height: number;
        width: number
      }
    }
    description: string;
    images: [{
      url: string;
      height: number;
      width: number;
    }];
    liked: boolean;
}