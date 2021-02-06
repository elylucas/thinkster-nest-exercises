
export class SessionEntity {
  id: number;
  title: string;
  speakerId: number;
  abstract?: string;
  time: Date;
  roomId: number;
  createdAt: Date = new Date();
  createdBy: string;
  level: 'beginner' | 'intermediate' | 'advanced'
}
