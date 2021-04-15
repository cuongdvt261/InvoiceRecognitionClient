import { Table, Column, Model, DataType } from 'sequelize-typescript';

export const UserN = 'Not a model';
export const NUser = 'Not a model';

@Table({ modelName: 'User', tableName: 'users', timestamps: false })
export class User extends Model {
    @Column({ primaryKey: true, type: DataType.STRING })
    Username?: string;

    @Column({ allowNull: false, type: DataType.STRING })
    Password?: string;

    @Column({ allowNull: false, type: DataType.STRING })
    Name?: string;

    @Column({ allowNull: false, type: DataType.INTEGER })
    Group?: number;

    @Column({ allowNull: true, type: DataType.STRING })
    Description?: string;
}