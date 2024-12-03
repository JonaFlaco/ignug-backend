export interface File extends Blob {
    readonly name: string;
    readonly lastModified: number;
    readonly size: number
    readonly type: string
  }
