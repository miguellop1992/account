import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';
import { Database } from './database';
import 'rxjs/add/operator/map';


export interface IOperation {
    _id?: number;
    account_id: number;
    multitype_id?: string;
    description?: string,
    add?: number;
    subtract?: number,
    balance?: number,
    created?: Date
}

/*
 
*/

@Injectable()
export class OperationProvider extends Database<IOperation> {
    static ADD_TYPE: string = '2.1'


    constructor(sqlite: SQLite) {
        super(sqlite);
    }

    protected table(db: SQLiteObject): Promise<boolean> {
        return new Promise((resolve_, reject_) => {
            //Table Operation
            // db.executeSql("DROP TABLE operation", {}).then(data => resolve_(true)).catch(err => reject_(err));

            let account = `CREATE TABLE IF NOT EXISTS operation (
                _id INTEGER PRIMARY KEY AUTOINCREMENT,
                account_id INTEGER,
                multitype_id VARCHAR(50),
                description VARCHAR(50),
                'add' REAL,
                subtract REAL,
                balance REAL,
                created DATETIME      
            );`
            db.executeSql(account, {}).then(data => resolve_(true)).catch(err => reject_(err));
        });

    }


    protected insertImp(db: SQLiteObject, value: IOperation): Promise<IOperation | string> {
        return new Promise<IOperation | string>((resolve_, reject_) => {
            db.transaction((tx: SQLiteTransaction) => {
                tx.executeSql('SELECT balance FROM account WHERE _id=' + value.account_id, {},
                    (tx, data) => {
                        let balance = data.rows.item(0).balance;
                        tx.executeSql('INSERT INTO operation (account_id,multitype_id,description,"add",subtract,balance,created) VALUES(?,?,?,?,?,?,?)',
                            [
                                value.account_id,
                                (value.multitype_id) ? value.multitype_id : null,
                                value.description,
                                (value.add) ? value.add : 0,
                                (value.subtract) ? value.subtract : 0,
                                balance,
                                new Date().toISOString()
                            ], (tx, data, success) => {

                                value._id = data.insertId;
                                value.balance = balance;

                                if (value.multitype_id == "2.1") {
                                    balance += (typeof value.add === 'string') ? parseFloat("" + value.add) : value.add;
                                } else {
                                    balance -= (typeof value.subtract === 'string') ? parseFloat("" + value.subtract) : value.subtract;
                                }

                                tx.executeSql('UPDATE account SET balance=? WHERE _id=?', [balance, value.account_id]);

                            });

                    }, err => {
                        reject_(err)
                    });

            }).then(data => {
                resolve_(value);
            })
                .catch(err => reject_(err.message));

        });
    }

    protected getImp(db: SQLiteObject, id: number): Promise<IOperation> {
        return Promise.reject(null);
        // return new Promise<IOperation>((resolve_, reject_) => {
        //     db.executeSql('SELECT * FROM account WHERE _id='+id, null)
        //         .then((data) => {
        //             resolve_(data.rows.item(0));
        //         })
        //         .catch(err => reject_(err));
        // });
    }
    protected getAllImp(db: SQLiteObject, params?: { account_id: string }): Promise<IOperation[]> {
        return new Promise<IOperation[]>((resolve_, reject_) => {
            db.executeSql('SELECT * FROM operation WHERE account_id=' + params.account_id, null)
                .then((data) => {
                    let ope = [];
                    for (var i = 0; i < data.rows.length; i++) {
                        ope.push(data.rows.item(i));
                    }
                    resolve_(ope);
                })
                .catch(err => reject_(err));
        });
    }

    protected updateImp(db: SQLiteObject, value: IOperation): Promise<IOperation | string> {
        return Promise.reject(false);
    }

    protected deleteImp(db: SQLiteObject, id: number): Promise<boolean> {
        return new Promise<boolean>((resolve_, reject_) => {
            db.executeSql('SELECT * FROM operation WHERE _id=' + id, {})
                .then((data) => {
                    let ope=<IOperation>data.rows.item(0);
                    db.executeSql('UPDATE account SET balance=balance+? WHERE _id=?', [
                        (ope.multitype_id=='2.1')?ope.add*-1: ope.subtract,
                        ope.account_id
                    ])
                    .then(() => {
                        db.executeSql('DELETE FROM operation WHERE _id=' + id, {})
                        .then(()=>resolve_(true));                        
                    });
                })
                .catch(err => reject_(err));
        });
    }

    balances(account_id: number): Promise<{ balance: number, add: number, subtract: number }> {
        let add = 0;
        let subtract = 0;
        return new Promise<{ balance: number, add: number, subtract: number }>((resolve_, reject_) => {
            this.init().then((db) => {
                db.executeSql('SELECT sum("add") as "add", sum(subtract) as "subtract" FROM operation WHERE account_id=?', [account_id])
                    .then((data) => {
                        add = data.rows.item(0).add;
                        subtract = data.rows.item(0).subtract;
                        db.executeSql('SELECT balance FROM account WHERE _id=?', [account_id])
                            .then(data => {
                                let balance = data.rows.item(0).balance;
                                resolve_({
                                    add: add ? add : 0,
                                    subtract: subtract ? subtract : 0,
                                    balance: balance
                                });
                            });
                    })
                    .catch(err => reject_(err));
            });

        });
    }
}

