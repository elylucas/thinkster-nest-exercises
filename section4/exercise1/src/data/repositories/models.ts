import { RoomEntity } from '../room.entity';
import { SpeakerEntity } from '../speaker.entity';
import { SessionEntity } from '../session.entity';

export interface ParamsBase {
  sort?: string;
  page?: number;
  pageSize?: number;
}

export class QueryResult<T> {
  page: number;
  pageSize: number;
  sort?: string;
  total: number;
  totalPages: number;
  data: T[];
}

export interface ConfAppDb {
  rooms: RoomEntity[];
  speakers: SpeakerEntity[];
  sessions: SessionEntity[];
}
