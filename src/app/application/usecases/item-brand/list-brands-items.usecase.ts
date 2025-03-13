import {
    ItemBrandEntity,
    type ItemBrandRaw,
} from '@app/domain/entities/item-brand.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type ListBrandsItemsI } from '../../ports/usecases/item-brand.usecase.port'
import { type ItemBrandRepositoryI } from '../../ports/repositories/item-brand.repository'

export class ListBrandsItemsUseCase implements ListBrandsItemsI {
    constructor(private readonly repository: ItemBrandRepositoryI) {}

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
