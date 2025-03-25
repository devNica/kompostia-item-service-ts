import {
    findDeepestId,
    getObjetcKeyPath,
} from '@core/shared/utils/object.utils'
import {
    StorageLocationNodeProps,
    StorageLocationNodeVO,
} from '../value-objects/storage-location-node.vo'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'
import { BaseEntity } from '@core/domain/entities/base.entity'
import { DomainErrorPresenter } from '@core/application/presenters/domain-error.presenter'

export interface LocationLinkedListProps {
    path: StorageLocationNodeVO
    address: string
}

export type LocationLinkedListRaw = Omit<LocationLinkedListProps, 'path'> & {
    locationId: string
    path: StorageLocationNodeProps | null
}

export class LocationLinkedListEntity extends BaseEntity<LocationLinkedListProps> {
    private static readonly searchKey = 'nomeclature'

    private constructor(
        props: LocationLinkedListProps,
        locationId: UniqueIdentificatorVO
    ) {
        super(props, locationId)
    }

    static new(data: LocationLinkedListRaw): LocationLinkedListEntity {
        if (!data.path) {
            throw new DomainErrorPresenter(
                'El objeto path no puede ser nulo',
                'LocationLinkedListEntity'
            )
        }

        const path = StorageLocationNodeVO.fromRawData(data.path)

        // Obtener la cadena de direccion del producto
        const address = getObjetcKeyPath(data.path, this.searchKey)

        // Obtener el Id de la referencia ultima de la ubicacion del producto
        const [locationId] = findDeepestId(data.path, {
            filterKey: 'locationId',
            depth: 0,
        })

        return new LocationLinkedListEntity(
            {
                path,
                address,
            },
            new UniqueIdentificatorVO(locationId)
        )
    }

    get address(): string {
        return this.props.address
    }

    getId(): string {
        return this.id._value
    }

    getAllProps(): LocationLinkedListRaw {
        return {
            locationId: this.id._value,
            address: this.props.address,
            path: this.props.path.getAllProps(),
        }
    }
}
