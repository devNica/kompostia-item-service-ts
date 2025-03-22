import { type ItemCategoryRepositoryPort } from '../ports/repositories/item-category.repository'
import {
    type CtgItemDTO,
    type VerifyProductSKUI,
} from '../ports/usecases/catalog-item.usecase.port'

export class VerifyProductSKUUseCase implements VerifyProductSKUI {
    constructor(private readonly repository: ItemCategoryRepositoryPort) {}

    async run(data: Pick<CtgItemDTO, 'sku'>): Promise<{ available: boolean }> {
        await this.repository.skuExists(data)

        return {
            available: true,
        }
    }
}
