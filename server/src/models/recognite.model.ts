import { Table, Column, Model, DataType, CreatedAt, DeletedAt, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { User } from './user.model';

export const RecogniteN = 'Not a model';
export const NRecognite = 'Not a model';

@Table({
    modelName: 'Recognite',
    tableName: 'recognite',
    initialAutoIncrement: '1'
})
export class Recognite extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    Id?: number

    @Column({ allowNull: false, type: DataType.STRING })
    FileUpload?: string;

    @Column({ allowNull: false, type: DataType.STRING })
    FileResult?: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
    IsDeleted?: boolean;

    @Column({ allowNull: true, type: DataType.STRING })
    Description?: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING })
    Username?: string;

    @BelongsTo(() => User)
    User?: User

    @CreatedAt
    creationDate?: Date;

    @DeletedAt
    deletionDate?: Date;
}