import {
    ItemBrandEntity,
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/item-brand.entity'
import { type CreateItemBrandPort } from '../../ports/usecases/item-brand.usecase.port'
import { type ItemBrandRepositoryPort } from '../../ports/repositories/item-brand.repository'

export class CreateItemBrandUseCase implements CreateItemBrandPort {
    constructor(private readonly repository: ItemBrandRepositoryPort) {}

    async run(data: ItemBrandProps): Promise<ItemBrandRaw> {
        const itemBrandEntity = ItemBrandEntity.new(data)

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
