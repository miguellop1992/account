import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

export abstract class Database<T>{
  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {

  }

  private open(): Promise<boolean> {
    return new Promise((resolve_, reject_) => {
      if (!this.db) {
        this.sqlite.create({
          name: '__.account',
          location: 'default'
        })
          .then((db_: SQLiteObject) => {
            this.db = db_;
            this.table(db_)
              .then((data) => resolve_(data))
              .catch((err) => reject_(err));
          })
          .catch((err) =>reject_(err));
      }else{
        resolve_(true);
      }

    });
  }

  protected abstract table(db: SQLiteObject): Promise<boolean>;

  protected abstract insertImp(db: SQLiteObject, value: T): Promise<T | string>;

  protected abstract getImp(db: SQLiteObject, id: number ): Promise<T>;

  protected abstract getAllImp(db: SQLiteObject,params?:{}): Promise<T[]>;

  protected abstract updateImp(db: SQLiteObject, value: T): Promise<boolean>;

  protected abstract deleteImp(db: SQLiteObject, id: number): Promise<boolean>;

  init(): Promise<SQLiteObject> {
    return new Promise<SQLiteObject>((resolve_, reject_) => {
      this.open().then(data => {
        resolve_(this.db);
      })
    });
  }

  insert(value: T): Promise<T | string> {
    return new Promise<T | string>((resolve_, reject_) => {
      this.open().then(data => {
        resolve_(this.insertImp(this.db, value));
      })
    });
  }

  get(id: number): Promise<T>{
    return new Promise((resolve_, reject_) => {
      this.open().then(data => {
        resolve_(this.getImp(this.db,id));
        // .then((data) => resolve_(data))
        // .catch((err) => reject_(err));
      })
    });
  }

  getAll(params?:{}): Promise<T[]> {
    return new Promise<T[]>((resolve_, reject_) => {
      this.open().then(data => {
        resolve_(this.getAllImp(this.db,params));
        // this.getAllImp(this.db)
        // .then((data) => resolve_(data))
        // .catch((err) => reject_(err));
      });
    });
  }

  update(value: T): Promise<boolean>{
    return new Promise((resolve_, reject_) => {
      this.open().then(data => {
        resolve_(this.updateImp(this.db,value));
        // .then((data) => resolve_(data))
        // .catch((err) => reject_(err));
      })
    });
  }

  delete(id: number): Promise<boolean>{
    return new Promise((resolve_, reject_) => {
      this.open().then(data => {
        resolve_(this.deleteImp(this.db,id));
        // .then((data) => resolve_(data))
        // .catch((err) => reject_(err));
      })
    });
  }

}