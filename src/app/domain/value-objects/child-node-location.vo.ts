import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface LocationNodeProps {
    locationId?: string
    name: string // nombre del almacen
    nomeclature: string
    ref: string // ref == parentId
    type: string
    path?: LocationNodeProps | undefined
}

export class ChildNodeLocationVO extends BaseEntity<LocationNodeProps> {
    private constructor(
        props: LocationNodeProps,
        locationId: UniqueIdentificatorVO
    ) {
        super(props, locationId)
    }

    static fromRawData(data: LocationNodeProps): ChildNodeLocationVO {
        const locationId = new UniqueIdentificatorVO(data.locationId)

        // Validar y clonar childrens (manteniendo la estructura simple)
        const childrens = data.path ? { ...data.path } : undefined

        return new ChildNodeLocationVO(
            {
                ...data,
                path: childrens,
            },
            locationId
        )
    }

    getAllProps(): LocationNodeProps {
        return {
            locationId: this.props.locationId,
            name: this.props.name,
            nomeclature: this.props.nomeclature,
            ref: this.props.ref,
            type: this.props.type,
            path: this.props.path,
        }
    }
}
