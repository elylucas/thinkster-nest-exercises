export class RoomEntity {
  id: number;
  name: string;
  capacity: number;
  createdAt: Date = new Date();
  createdBy: string;
}
