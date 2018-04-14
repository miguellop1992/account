import {  Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

const win: any = window;

export abstract class Database<T>{
  private DB_NAME:string = "__.account";
  protected db: SQLiteObject;
  constructor(private sqlite: SQLite,private platform: Platform) {
  }

  private open(): Promise<boolean> {
    return new Promise((resolve_, reject_) => {
      if (!this.db) {
        if(this.platform.is('cordova')){
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
          this.db =new SQLiteObject(win.openDatabase(this.DB_NAME, '1.0', 'database', 5 * 1024 * 1024));
        }
      }else{
        resolve_(true);
      }

    });
  }

  protected abstract table(db: SQLiteObject): Promise<boolean>;

  protected abstract insertImp(db: SQLiteObject, value: T): Promise<T | string>;

  protected abstract getImp(db: SQLiteObject, id: number ): Promise<T>;

  protected abstract getAllImp(db: SQLiteObject,params?:{}): Promise<T[]>;

  protected abstract updateImp(db: SQLiteObject, value: T): Promise<T | string>;

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
      });
    });
  }

  update(value: T): Promise<T | string>{
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