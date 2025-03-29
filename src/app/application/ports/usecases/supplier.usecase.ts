import { SupplierProps } from "@app/domain/entities/supplier.entity";
import { QueryParams } from "@core/application/models/app/app.model";

export type SupplierDTO = Required<SupplierProps>
export type SupplierUpdateDTO = Omit<SupplierDTO, 'supplierId' | 'supplierCode'>

export interface CreateSupplierPort {
    run: (data: Omit<SupplierDTO, 'supplierId'>) => Promise<SupplierDTO>
}

export interface GetSupplierPort {
    run: (supplierId: string) => Promise<SupplierDTO>
}

export interface UpdateSupplierPort {
    run: (data: SupplierUpdateDTO, supplierId: string) => Promise<SupplierDTO>
}

export interface ListSupplierPort {
    run: (data: QueryParams) => Promise<SupplierDTO[]>
}