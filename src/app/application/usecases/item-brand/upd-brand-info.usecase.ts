import {
    ItemBrandEntity,
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/item-brand.entity'
import { type UpdateBrandInformationI } from '../../ports/usecases/item-brand.usecase.port'
import { type ItemBrandRepositoryI } from '../../ports/repositories/item-brand.repository'

export class UpdateBrandInformationUseCase implements UpdateBrandInformationI {
    constructor(private readonly repository: ItemBrandRepositoryI) {}

    async run(data: ItemBrandProps, brandId: string): Promise<ItemBrandRaw> {
        const brandsEntity = ItemBrandEntity.new({
            brandId,
            ...data,
        })

        const brands = brandsEntity.getAllProps()

        await this.repository.updateById(brands)

        return brands
    }
}
