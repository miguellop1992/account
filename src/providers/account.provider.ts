import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Database } from './database';
import { OperationProvider, IOperation } from './operation.provider';

import 'rxjs/add/operator/map';


export interface IAccount {
    _id?: number;
    multitype_id?: number;
    name?: string;
    observation?: string;
    coin?: string;
    balance?: number;
    created?: Date
}

/*
 
*/

@Injectable()
export class AccountProvider extends Database<IAccount> {

    constructor(sqlite: SQLite, platform: Platform, protected opeProv: OperationProvider) {
        super(sqlite, platform);
    }

    protected table(db: SQLiteObject): Promise<boolean> {
        return new Promise((resolve_, reject_) => {
            //Table Account
            // db.executeSql("DROP TABLE account", {}).then(data => resolve_(true)).catch(err => reject_(err));

            let account = `CREATE TABLE IF NOT EXISTS account (
                _id INTEGER PRIMARY KEY AUTOINCREMENT,
                multitype_id VARCHAR(50),
                name VARCHAR(50),
                coin VARCHAR(50),
                observation VARCHAR(256),
                balance REAL ,
                created DATETIME      
            );
            `

            db.executeSql(account, {})
                .then(() => resolve_(true))
                .catch(err => reject_(false));
        });

    }


    protected insertImp(db: SQLiteObject, value: IAccount): Promise<IAccount | string> {

        return new Promise<IAccount | string>((resolve_, reject_) => {
            db.executeSql('INSERT INTO account (name,coin,observation,balance,created) VALUES(?,?,?,?,?)',
                [
                    value.name,
                    (value.coin) ? value.coin : null,
                    (value.observation) ? value.observation : null,
                    0,
                    new Date().toISOString()
                ])
                .then((data) => {
                    value._id = data.insertId;
                    let ope: IOperation = {
                        account_id: value._id,
                        description: "Saldo Inicial",
                    };
                    if (value.balance > 0) {
                        ope.multitype_id = OperationProvider.ADD_TYPE;
                        ope.add = Math.abs(value.balance);
                    } else {
                        ope.multitype_id = OperationProvider.SUBTRACT_TYPE;
                        ope.subtract = Math.abs(value.balance);
                    }

                    this.opeProv.insert(ope).then(data => {
                        resolve_(value);
                    })


                })
                .catch(err => reject_(err.message));
        });
    }

    protected getImp(db: SQLiteObject, id: number): Promise<IAccount> {
        return new Promise<IAccount>((resolve_, reject_) => {
            db.executeSql('SELECT * FROM account WHERE _id=? ', [id])
                .then((data) => {
                    resolve_(data.rows.item(0));
                })
                .catch(err => reject_(err));
        });
    }

    protected getAllImp(db: SQLiteObject, params?: {}): Promise<IAccount[]> {
        return new Promise<IAccount[]>((resolve_, reject_) => {
            db.executeSql('SELECT * FROM account WHERE multitype_id IS NULL', [])
                .then((data) => {
                    let accounts = [];
                    for (var i = 0; i < data.rows.length; i++) {
                        accounts.push(data.rows.item(i));
                    }
                    resolve_(accounts);
                })
                .catch(err => reject_(err));
        });
    }

    protected updateImp(db: SQLiteObject, value: IAccount): Promise<IAccount | string> {
        return Promise.reject(false);
    }

    protected deleteImp(db: SQLiteObject, id: number): Promise<boolean> {
        return new Promise<boolean>((resolve_, reject_) => {
            db.executeSql('DELETE FROM account WHERE _id=?', [id])
                .then((data) => {
                    db.executeSql('DELETE FROM operation WHERE account_id=?', [id])
                        .then((data) => {
                            resolve_(true)
                        })
                })
                .catch(err => reject_(err));
        });
    }

}

