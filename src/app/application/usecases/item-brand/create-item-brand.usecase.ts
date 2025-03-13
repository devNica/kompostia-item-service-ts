import {
    ItemBrandEntity,
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/item-brand.entity'
import { type CreateItemBrandI } from '../../ports/usecases/item-brand.usecase.port'
import { type ItemBrandRepositoryI } from '../../ports/repositories/item-brand.repository'

export class CreateItemBrandUseCase implements CreateItemBrandI {
    constructor(private readonly repository: ItemBrandRepositoryI) {}

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
