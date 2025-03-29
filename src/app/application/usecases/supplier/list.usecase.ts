import { SupplierRepositoryPort } from "@app/application/ports/repositories/supplier.repository";
import { ListSupplierPort, SupplierDTO } from "@app/application/ports/usecases/supplier.usecase";
import { QueryParams } from "@core/application/models/app/app.model";

export class ListSupplierUseCase implements ListSupplierPort {

    constructor(
        private readonly repository: SupplierRepositoryPort
    ){}
    
    async run (data: QueryParams): Promise<SupplierDTO[]>{

        const result = await this.repository.fetchByParams(data)

        const suppliers = result.map((ele): SupplierDTO => ({
            supplierId: ele.id,
            supplierCode: ele.supplierCode,
            supplierName: ele.supplierName,
            isActive: ele.isActive
        }))

        return suppliers

    }
    
}