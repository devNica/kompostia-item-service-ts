import {
    ItemBrandEntity,
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/brand.entity'
import { type CreateItemBrandPort } from '../../ports/usecases/brand.usecase.port'
import { type BrandRepositoryPort } from '../../ports/repositories/brand.repository'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export class CreateItemBrandUseCase implements CreateItemBrandPort {
    constructor(private readonly repository: BrandRepositoryPort) {}

    async run(data: ItemBrandProps): Promise<ItemBrandRaw> {
        const itemBrandEntity = ItemBrandEntity.new({
             brandId: new UniqueIdentificatorVO()._value, //generar un id temporal
             ...data
        })

        const itemBrand = await this.repository.save(
            itemBrandEntity.getAllProps()
        )

        return {
            brandId: itemBrand.id,
            brandName: itemBrand.brandName,
            isActive: itemBrand.isActive,
        }
    }
}
