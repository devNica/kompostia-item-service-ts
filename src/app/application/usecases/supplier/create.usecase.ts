import { SupplierRepositoryPort } from "@app/application/ports/repositories/supplier.repository";
import { CreateSupplierPort, SupplierDTO } from "@app/application/ports/usecases/supplier.usecase";
import { SupplierEntity, SupplierProps } from "@app/domain/entities/supplier.entity";
import { UniqueIdentificatorVO } from "@core/domain/value-objects/unique-identificator.vo";

export class CreateSupplierUseCase implements CreateSupplierPort {

    constructor(
        private readonly repository: SupplierRepositoryPort
    ){}

    async run (data: Omit<SupplierDTO, 'supplierId'>): Promise<SupplierDTO>{

        const supplier = SupplierEntity.new({
            supplierId: new UniqueIdentificatorVO()._value,
            ...data
        })

        const {supplierId} = await this.repository.save(supplier.getAllProps() as Required<SupplierProps>)

        supplier.setPersistentId(supplierId)

        return supplier.getAllProps() as SupplierDTO
    }

}