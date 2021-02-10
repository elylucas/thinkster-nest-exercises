export class SpeakerEntity {
  id: number;
  name: string;
  bio?: string;
  hasSpokeBefore: boolean;
  createdAt: Date = new Date();
  createdBy: string;
}
