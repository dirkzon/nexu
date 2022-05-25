export interface CommentState {
    comments: UserComment[]
    canComment: boolean,
}

export interface UserComment {
    comment: string;
    createdAt: Date;
    createdBy: {
        name: string;
        id: string;
    }  
}