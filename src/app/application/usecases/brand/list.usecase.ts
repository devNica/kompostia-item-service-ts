import {
    ItemBrandEntity,
    type ItemBrandRaw,
} from '@app/domain/entities/brand.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type ListBrandsItemsPort } from '../../ports/usecases/brand.usecase.port'
import { type BrandRepositoryPort } from '../../ports/repositories/brand.repository'

export class ListBrandsItemsUseCase implements ListBrandsItemsPort {
    constructor(private readonly repository: BrandRepositoryPort) {}

    async run(data: QueryParams): Promise<ItemBrandRaw[]> {
        const brandsFound = await this.repository.fetchByParams(data)

        const brands = brandsFound.map((ele) =>
            ItemBrandEntity.new({
                brandId: ele.id,
                brandName: ele.brandName,
                isActive: ele.isActive,
            })
        )

        return brands.map((b) => b.getAllProps())
    }
}
