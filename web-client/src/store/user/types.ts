export interface UserState {
    profile: {
        name: string;
        image: {
            url: string;
            id: string;
        };
        email: string;
        bio: string;
    }
}