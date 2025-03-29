import { SupplierProps } from "@app/domain/entities/supplier.entity";
import { SupplierDTO, SupplierUpdateDTO } from "../usecases/supplier.usecase";
import { QueryParams } from "@core/application/models/app/app.model";
import { KomposeModels } from "@devnica/kompostia-models-ts";


export interface SupplierRepositoryPort {
    save: (data: Required<SupplierProps>) => Promise<{ supplierId: string }>
    fetchById: (supplierId: string) => Promise<SupplierDTO>
    fetchByParams: (data: QueryParams) => Promise<KomposeModels.SupplierModel[]>
    updateById: (data: SupplierUpdateDTO, supplierId: string) => Promise<SupplierDTO>

}