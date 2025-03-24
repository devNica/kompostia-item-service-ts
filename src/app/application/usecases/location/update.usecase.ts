import {
    StorageLocationEntity,
    type StorageLocationRaw,
    type LocationTypeRaw,
} from '@app/domain/entities/storage-location.entity'
import {
    type UpdateStorageLocationDTO,
    type UpdateStorageLocationPort,
} from '../../ports/usecases/location.usecase.port'
import { type StorageLocationRepositoryPort } from '../../ports/repositories/product-location.repository'

export class UpdateStorageLocationUseCase implements UpdateStorageLocationPort {
    constructor(private readonly repository: StorageLocationRepositoryPort) {}

    async run(
        data: UpdateStorageLocationDTO,
        locationId: string
    ): Promise<StorageLocationRaw> {
        let parentRules: LocationTypeRaw | undefined

        if (data.parentId) {
            parentRules = await this.repository.fetchByParentId(data.parentId)
        }

       
        const childRules = await this.repository.fetchLocationTypeyId(data.locationTypeId)

        const lct = StorageLocationEntity.create(
            {
                locationId,
                locationName: data.locationName,
                nomeclature: data.nomeclature,
                parentId: data.parentId,
                locationTypeId: data.locationTypeId,
                hasAccounting: data.hasAccounting,
            },
            {
                parent: parentRules,
                child: childRules,
            }
        )

        await this.repository.updateById({
            locationId,
            ...lct.getAllProps(),
        })

        return lct.getAllProps()
    }
}
