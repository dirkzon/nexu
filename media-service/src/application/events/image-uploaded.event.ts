export class ImageUploadedEvent {
  constructor(
    public readonly id: string,
    public readonly postId: string,
    public readonly height: number,
    public readonly width: number,
    public readonly url: string,
  ) {}
}
