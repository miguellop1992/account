import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { OperationProvider } from './operation.provider';
import { AccountProvider, IAccount } from './account.provider';
import 'rxjs/add/operator/map';



/*
 
*/

@Injectable()
export class DebtListProvider extends AccountProvider {
    static ID = '1.1';

    constructor(sqlite: SQLite, protected opeProv: OperationProvider) {
        super(sqlite, opeProv);
    }

    protected insertImp(db: SQLiteObject, value: IAccount): Promise<IAccount | string> {

        return new Promise<IAccount | string>((resolve_, reject_) => {
            db.executeSql('INSERT INTO account (name,coin,multitype_id,balance,created) VALUES(?,?,?,?,?)',
                [
                    (value.name) ? value.name : '',
                    (value.coin) ? value.coin : null,
                    DebtListProvider.ID,
                    (value.balance) ? value.balance : null,
                    new Date().toISOString()
                ])
                .then((data) => resolve_(data))
                .catch(err => reject_(err.message));
        });
    }

    protected getAllImp(db: SQLiteObject): Promise<IAccount[]> {
        return new Promise<IAccount[]>((resolve_, reject_) => {
            db.executeSql('SELECT * FROM account WHERE multitype_id=?', [DebtListProvider.ID])
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
        return new Promise<IAccount | string>((resolve_, reject_) => {
                db.executeSql('UPDATE account SET name=?, balance=?, coin=?, observation=? WHERE _id = ?', [
                    (value.name) ? value.name : '',
                    (value.balance) ? value.balance : null,
                    (value.coin) ? value.coin : null,
                    (value.observation) ? value.observation : null,
                    value._id
                ])
                    .then((data) => resolve_(data))
                    .catch(err => reject_(err.message));
        });
    }

    protected deleteImp(db: SQLiteObject, id: number): Promise<boolean> {
        return new Promise<boolean>((resolve_, reject_) => {
            db.executeSql('DELETE FROM account WHERE _id=?', [id])
                .then((data) => resolve_(data))
                .catch(err => reject_(err));
        });
    }

    public toAccount(value: IAccount): Promise<boolean> {
        return new Promise<boolean>((resolve_, reject_) => {
            this.db.executeSql('UPDATE ACCOUNT SET multitype_id=?, balance=? WHERE _id = ?', [null,0,value._id])
                .then((data) => {
                    value._id = data.insertId;
                    this.opeProv.insert({
                        account_id: value._id,
                        multitype_id: OperationProvider.ADD_TYPE,
                        description: "Saldo Inicial",
                        add: value.balance
                    }).then(data => {
                        resolve_(true);
                    })
                })
                .catch(err => reject_(false));
        });
    }

}

