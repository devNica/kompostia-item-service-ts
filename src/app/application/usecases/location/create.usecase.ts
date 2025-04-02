import {
    type LocationTypeRaw,
    StorageLocationEntity,
    type StorageLocationRaw,
} from '@app/domain/entities/storage-location.entity'
import {
    type CreateStorageLocationDTO,
    type CreateStorageLocationPort,
} from '../../ports/usecases/location.usecase.port'
import { type StorageLocationRepositoryPort } from '../../ports/repositories/storage-location.repository'

export class CreateStorageLocationUseCase implements CreateStorageLocationPort {
    constructor(private readonly repository: StorageLocationRepositoryPort) {}

    async run(data: CreateStorageLocationDTO): Promise<StorageLocationRaw> {
        let parentRules: LocationTypeRaw | undefined

        if (data.parentId) {
            parentRules = await this.repository.fetchByParentId(data.parentId)
        }

        const childRules = await this.repository.fetchLocationTypeyId(
            data.locationTypeId
        )

        const lct = StorageLocationEntity.create(
            {
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

        const location = await this.repository.save(lct.getAllProps())

        lct.setPersistentId(location.locationId)

        return lct.getAllProps()
    }
}
