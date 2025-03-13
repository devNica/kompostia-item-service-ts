import {
    type LocationTypeRaw,
    StorageLocationEntity,
    type StorageLocationRaw,
} from '@app/domain/entities/storage-location.entity'
import {
    type CreateStorageLocationDTO,
    type CreateStorageLocationI,
} from '../../ports/usecases/location.usecase.port'
import { type StorageLocationRepositoryI } from '../../ports/repositories/product-location.repository'

export class CreateStorageLocationUseCase implements CreateStorageLocationI {
    constructor(private readonly repository: StorageLocationRepositoryI) {}

    async run(data: CreateStorageLocationDTO): Promise<StorageLocationRaw> {
        let parentRules: LocationTypeRaw | undefined

        if (data.parentId) {
            parentRules = await this.repository.fetchByParentId(data.parentId)
        }

        const childRules = await this.repository.fetchById(data.locationTypeId)

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
