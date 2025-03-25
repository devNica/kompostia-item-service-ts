import {
    ItemBrandEntity,
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/brand.entity'
import { type UpdateBrandInformationPort } from '../../ports/usecases/brand.usecase.port'
import { type BrandRepositoryPort } from '../../ports/repositories/brand.repository'

export class UpdateBrandInformationUseCase
    implements UpdateBrandInformationPort
{
    constructor(private readonly repository: BrandRepositoryPort) {}

    async run(data: ItemBrandProps, brandId: string): Promise<ItemBrandRaw> {
        const brandsEntity = ItemBrandEntity.new({
            brandId,
            brandName: data.brandName,
            isActive: data.isActive,
        })

        const brands = brandsEntity.getAllProps()

        await this.repository.updateById(brands)

        return brands
    }
}
