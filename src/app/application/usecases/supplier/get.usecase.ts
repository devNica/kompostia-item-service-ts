import { SupplierRepositoryPort } from "@app/application/ports/repositories/supplier.repository";
import { GetSupplierPort, SupplierDTO } from "@app/application/ports/usecases/supplier.usecase";
import { SupplierEntity } from "@app/domain/entities/supplier.entity";


export class GetSupplierUseCase implements GetSupplierPort {

    constructor(
        private readonly repository: SupplierRepositoryPort
    ){}
    
    
    async run(supplierId: string): Promise<SupplierDTO>{

        const result = await this.repository.fetchById(supplierId)

        const supplier = SupplierEntity.new(result)

        return supplier.getAllProps() as SupplierDTO
    }

    
}