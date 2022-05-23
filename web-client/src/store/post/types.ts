export interface PostState {
    createdAt: Date;
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
}