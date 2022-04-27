export class UserUpdatedEvent {
    constructor(
        public readonly name: string,
        public readonly id: string,
    ) {}
}