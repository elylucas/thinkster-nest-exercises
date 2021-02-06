import * as FileSync from 'lowdb/adapters/FileSync';
import * as lowdb from 'lowdb';
import { ConfAppDb, ParamsBase, QueryResult } from './models';
import { EntityNotFoundException, EntityConstraintException } from './entity-not-found.exception';
import { Injectable } from '@nestjs/common';

interface EntityBase { id: number; createdBy: string; createdAt: Date };

@Injectable()
export abstract class BaseRepository<T extends EntityBase, P extends ParamsBase> {
  protected db: lowdb.LowdbSync<ConfAppDb>;

  constructor(private entityName: string) {
    const adapter = new FileSync('./src/data/db.json', {
      defaultValue: defaultData
    });
    this.db = lowdb(adapter);
  }

  async getAll(params: P = {} as any): Promise<QueryResult<T>> {
    let db = this.db.get(this.entityName);
    if (params.sort) {
      db = db.sortBy((item) => {
        if (params.sort in item) {
          if (typeof item[params.sort] === 'string') {
            return item[params.sort].toLowerCase();
          }
          return item[params.sort];
        }
        return item;
      });
    }

    db = this.queryData(db, params);

    const queryResult = new QueryResult<T>();
    const totalCount = db.value().length;
    Object.assign(queryResult, {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? totalCount,
      totalPages: Math.ceil(db.value().length / (params.pageSize ?? totalCount)),
      total: totalCount,
      sort: params.sort
    });

    if (params.page && params.pageSize) {
      db = db.slice((params.page - 1) * params.pageSize).take(params.pageSize);
    }

    const entities = db.value().map(x => {
      return this.mapEntity(x);
    });

    queryResult.data = entities;

    return queryResult;
  }

  // Overriden in sub class to provide specific query functionality
  protected abstract queryData(db: any, params: ParamsBase);

  // Overriden in sub class to map plain JS object to proper entity
  protected abstract mapEntity(entity: any);

  // Overriden in sub class to map plain JS object to proper entity
  protected async validateEntity(entity: EntityBase) {
    const errors: string[] = [];
    if(typeof entity.createdBy !== 'string' || entity.createdBy.length === 0) {
      errors.push('CreatedBy is required and cannot be empty');
    }
    if(typeof entity.createdAt !== 'object' || typeof entity.createdAt.getMonth !== 'function') {
      errors.push('CreatedAt is required and must be a date');
    }
    return errors;
  };

  async get(id: number): Promise<T> {
    const dbRecord = await this.db
      .get(this.entityName)
      .find(x => x.id === id)
      .value();
    if (dbRecord) {
      return this.mapEntity(dbRecord);
    } else {
      throw new EntityNotFoundException(`${this.entityName} entity not found`);
    }
  }

  async create(entity: T) {
    const errors = await this.validateEntity(entity);
    if(errors.length > 0) {
      const message = errors.reduce((prev, cur) => prev + ', ' + cur, '');
      throw new EntityConstraintException(message);
    }
    const entities = await this.getAll();
    const maxId = Math.max(...entities.data.map(x => x.id));
    entity.id = maxId + 1;
    this.db
      .get(this.entityName)
      .push(entity)
      .write();
    return await entity;
  }

  async update(id: number, entity: T) {
    const errors = await this.validateEntity(entity);
    if(errors.length > 0) {
      const message = errors.reduce((prev, cur) => prev + ', ' + cur, '');
      throw new EntityConstraintException(message);
    }
    this.db
      .get(this.entityName)
      .find(x => (x.id as any) === id)
      .assign(entity)
      .write();
    return this.get(id);
  }

  async delete(id: number) {
    this.db
      .get(this.entityName)
      .remove({ id })
      .write();
  }

}

const defaultData: ConfAppDb = {
  rooms: [
    {
      id: 1,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      name: 'Grand Ballroom A',
      capacity: 100
    },
    {
      id: 2,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      name: 'Grand Ballroom B',
      capacity: 120
    },
    {
      id: 3,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      name: 'Vail',
      capacity: 40
    },
    {
      id: 4,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      name: 'Breck',
      capacity: 65
    }
  ],
  sessions: [
    {
      id: 1,
      title: 'Always be Coding',
      speakerId: 1,
      abstract: 'Info about Always be Coding session',
      time: new Date('2019-12-14T08:00Z'),
      roomId: 1,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      level: 'intermediate'
    },
    {
      id: 2,
      title: 'Intro to Programming',
      speakerId: 2,
      abstract: 'Info about Intro to Programming session',
      time: new Date('2019-12-14T09:00Z'),
      roomId: 2,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      level: 'beginner'
    },
    {
      id: 3,
      title: 'Which Framework is Right for You?',
      speakerId: 3,
      abstract: 'Info about Which Framework is Right for You? session',
      time: new Date('2019-12-14T10:00Z'),
      roomId: 3,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      level: 'advanced'
    },
    {
      id: 4,
      title: 'Data Structures for Everyone',
      speakerId: 4,
      abstract: 'Info about Data Structures for Everyone session',
      time: new Date('2019-12-14T11:00Z'),
      roomId: 3,
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      level: 'beginner'
    }
  ],
  speakers: [
    {
      id: 1,
      name: 'Abe Adams',
      bio: 'Abe is a dev',
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      hasSpokeBefore: true
    },
    {
      id: 2,
      name: 'Vicky Vasquez',
      bio: 'Vicky is a dev',
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      hasSpokeBefore: true
    },
    {
      id: 3,
      name: 'Charlie Cook',
      bio: 'Charlie is a dev',
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      hasSpokeBefore: false
    },
    {
      id: 4,
      name: 'Maria Moore',
      bio: 'Maria is a dev',
      createdAt: new Date('2019-12-14T20:54:28.754Z'),
      createdBy: 'admin',
      hasSpokeBefore: false
    }
  ]
};
