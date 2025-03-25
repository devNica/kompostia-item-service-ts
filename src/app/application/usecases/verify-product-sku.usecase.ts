import { type CategoryRepositoryPort } from '../ports/repositories/category.repository'
import {
    type CtgItemDTO,
    type VerifyProductSKUI,
} from '../ports/usecases/catalog-item.usecase.port'

export class VerifyProductSKUUseCase implements VerifyProductSKUI {
    constructor(private readonly repository: CategoryRepositoryPort) {}

    async run(data: Pick<CtgItemDTO, 'sku'>): Promise<{ available: boolean }> {
        await this.repository.skuExists(data)

        return {
            available: true,
        }
    }
}
