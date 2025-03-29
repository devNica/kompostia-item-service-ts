import { SupplierRepositoryPort } from "@app/application/ports/repositories/supplier.repository";
import { SupplierDTO, SupplierUpdateDTO, UpdateSupplierPort } from "@app/application/ports/usecases/supplier.usecase";
import { SupplierEntity } from "@app/domain/entities/supplier.entity";


export class UpdateSupplierUseCase implements UpdateSupplierPort {

    constructor(
        private readonly repository: SupplierRepositoryPort
    ) { }

    async run(data: SupplierUpdateDTO, supplierId: string): Promise<SupplierDTO> {

        const result = await this.repository.updateById(data, supplierId)

        const supplier = SupplierEntity.new(result)
        
        return supplier.getAllProps() as SupplierDTO
        
    }

}