import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface StorageLocationNodeProps {
    locationId?: string
    locationName: string
    nomeclature: string
    parentId: string 
    type: string
    path?: StorageLocationNodeProps | undefined
}

export class StorageLocationNodeVO extends BaseEntity<StorageLocationNodeProps> {
    private constructor(
        props: StorageLocationNodeProps,
        locationId: UniqueIdentificatorVO
    ) {
        super(props, locationId)
    }

    static fromRawData(data: StorageLocationNodeProps): StorageLocationNodeVO {
        const locationId = new UniqueIdentificatorVO(data.locationId)

        // Validar y clonar childrens (manteniendo la estructura simple)
        const childrens = data.path ? { ...data.path } : undefined

        return new StorageLocationNodeVO(
            {
                ...data,
                path: childrens,
            },
            locationId
        )
    }

    getAllProps(): StorageLocationNodeProps {
        return {
            locationId: this.props.locationId,
            locationName: this.props.locationName,
            nomeclature: this.props.nomeclature,
            parentId: this.props.parentId,
            type: this.props.type,
            path: this.props.path,
        }
    }
}
