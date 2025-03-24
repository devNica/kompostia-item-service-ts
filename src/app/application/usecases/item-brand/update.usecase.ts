import {
    ItemBrandEntity,
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/item-brand.entity'
import { type UpdateBrandInformationPort } from '../../ports/usecases/item-brand.usecase.port'
import { type ItemBrandRepositoryPort } from '../../ports/repositories/item-brand.repository'

export class UpdateBrandInformationUseCase
    implements UpdateBrandInformationPort
{
    constructor(private readonly repository: ItemBrandRepositoryPort) {}

    async run(data: ItemBrandProps, brandId: string): Promise<ItemBrandRaw> {
        const brandsEntity = ItemBrandEntity.new({
            brandId,
            brandName: data.brandName,
            isActive: data.isActive
        })

        const brands = brandsEntity.getAllProps()

        await this.repository.updateById(brands)

        return brands
    }
}
