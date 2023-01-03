 export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validadteContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validadteContentLength(content)

    if (!isContentLengthValid) {
      throw new Error('Content length error.')
    }
    this.content = content;
  }
 }