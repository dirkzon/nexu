export class AvatarUploadedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly height: number,
    public readonly width: number,
    public readonly url: string,
  ) {}
}
