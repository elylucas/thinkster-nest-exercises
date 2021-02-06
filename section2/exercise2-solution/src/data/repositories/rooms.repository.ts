import { Injectable } from '@nestjs/common';
import { RoomEntity } from '../room.entity';
import { BaseRepository } from './base.repository';
import { ParamsBase } from './models';

export interface RoomParams extends ParamsBase {
  name?: string;
  capacity?: number;
}

@Injectable()
export class RoomsRepository extends BaseRepository<RoomEntity, RoomParams> {

  constructor() {
    super('rooms');
  }

  protected queryData(db: RoomEntity[], params?: RoomParams) {
    if (params && params.name) {
      db = db.filter(x => x.name.toLowerCase().indexOf(params.name.toLowerCase()) > -1);
    }
    if(params && typeof params.capacity === 'number' && !Number.isNaN(params.capacity)) {
      db = db.filter(x => x.capacity >= params.capacity)
    }
    return db;
  }

  protected mapEntity(entity: any) {
    const room = Object.assign(new RoomEntity(), entity, {
      createdAt: new Date(entity.createdAt)
    }) as RoomEntity;
    return room;
  }

  protected async validateEntity(entity: RoomEntity) {
    const errors = await super.validateEntity(entity);
    if(typeof entity.name !== 'string' || entity.name.length === 0) {
      errors.push('name is required and cannot be empty');
    }
    if(typeof entity.capacity !== 'number' || entity.capacity <= 0) {
      errors.push('capacity is required and must be larger than 0');
    }
    return errors;
  }

}
