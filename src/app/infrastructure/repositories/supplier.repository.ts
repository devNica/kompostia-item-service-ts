import { SupplierRepositoryPort } from "@app/application/ports/repositories/supplier.repository";
import { SupplierDTO, SupplierUpdateDTO } from "@app/application/ports/usecases/supplier.usecase";
import { SupplierProps } from "@app/domain/entities/supplier.entity";
import { QueryParams } from "@core/application/models/app/app.model";
import { DatabaseCredentialModel } from "@core/application/models/db/database-credential.model";
import { RepositoryErrorPresenter } from "@core/application/presenters/repository-error.presenter";
import { RequestValidationErrorPresenter } from "@core/application/presenters/request-validation.presenter";
import { getDatabaseCrendential } from "@core/shared/configs/db-credentials";
import { KomposeConn, KomposeModels } from "@devnica/kompostia-models-ts";
import { Op, QueryError, Sequelize, ValidationError } from "sequelize";


class SupplierRepository implements SupplierRepositoryPort {

    private readonly sequelize: Sequelize
    private readonly schema: string

    constructor(credentials: DatabaseCredentialModel) {
        this.schema = credentials.DB_SCHEMA

        this.sequelize = KomposeConn.SequelizeInstance.create({
            database: credentials.DB_NAME,
            host: credentials.DB_HOST,
            user: credentials.DB_USER,
            password: credentials.DB_PASSWORD,
            schema: credentials.DB_SCHEMA,
        })
    }


    async fetchByParams(data: QueryParams): Promise<KomposeModels.SupplierModel[]> {
        try {
            const result = await KomposeModels.SupplierModel.findAll({
                where: {
                    [Op.or]: {
                        supplierName: {
                            [Op.iLike]: `%${data.value}%`, // Búsqueda case-insensitive
                        },
                        supplierCode: {
                            [Op.iLike]: `%${data.value}%`, // Búsqueda case-insensitive
                        },
                    },
                },
            })

            return result
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'SupplierRepository|FetchByParams'
            )
        }
    }


    async updateById(data: SupplierUpdateDTO, supplierId: string): Promise<SupplierDTO> {
        try {
            const supplier = await KomposeModels.SupplierModel.findByPk(supplierId)

            if (!supplier) {
                throw new Error(`No existe el proveedor con Id: ${supplierId}`)
            }

            supplier.supplierName = data.supplierName
            supplier.updatedAt = new Date().getTime()
            supplier.isActive = data.isActive

            await supplier.save()

            return {
                supplierId: supplier.id,
                supplierName: supplier.supplierName,
                supplierCode: supplier.supplierCode,
                isActive: supplier.isActive
            }

        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'SupplierRepository|UpdateById'
            )
        }
    }

    async fetchById(supplierId: string): Promise<Required<SupplierProps>> {
        try {
            const supplier = await KomposeModels.SupplierModel.findByPk(supplierId)
            if (!supplier) {
                throw new Error(`No existe el proveedor con Id: ${supplierId}`)
            }

            return {
                supplierId: supplier.id,
                supplierCode: supplier.supplierCode,
                supplierName: supplier.supplierName,
                isActive: supplier.isActive
            }
        } catch (error) {
            if (
                error instanceof QueryError ||
                error instanceof ValidationError
            ) {
                throw new RequestValidationErrorPresenter(
                    'Consulta de Registro fallido'
                )
            }
            throw new RepositoryErrorPresenter(
                String(error),
                'SupplierRepository|FetchById'
            )
        }
    }


    async save(data: Required<SupplierProps>): Promise<{ supplierId: string; }> {

        try {

            const supplier = await KomposeModels.SupplierModel.create({
                id: data.supplierId,
                supplierCode: data.supplierCode,
                supplierName: data.supplierName,
                createdAt: new Date().getTime()
            })

            return {
                supplierId: supplier.id
            }

        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'SupplierRepository|Save'
            )
        }
    }
}

export const supplierRepositoryImpl = new SupplierRepository(getDatabaseCrendential())