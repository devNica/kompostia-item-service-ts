import {
    findDeepestId,
    getObjetcKeyPath,
} from '@core/shared/utils/object.utils'
import {
    ChildNodeLocationVO,
    type LocationNodeProps,
} from '../value-objects/child-node-location.vo'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'
import { BaseEntity } from '@core/domain/entities/base.entity'
import { DomainErrorPresenter } from '@core/application/presenters/domain-error.presenter'

export interface NestedLocationProps {
    path: ChildNodeLocationVO
    address: string
}

export type NestedLocationRaw = Omit<NestedLocationProps, 'path'> & {
    locationId: string
    path: LocationNodeProps | null
}

export class NestedLocationEntity extends BaseEntity<NestedLocationProps> {
    private static readonly searchKey = 'nomeclature'

    private constructor(
        props: NestedLocationProps,
        locationId: UniqueIdentificatorVO
    ) {
        super(props, locationId)
    }

    static new(data: NestedLocationRaw): NestedLocationEntity {
        if (!data.path) {
            throw new DomainErrorPresenter(
                'El objeto path no puede ser nulo',
                'NestedLocationEntity'
            )
        }

        const path = ChildNodeLocationVO.fromRawData(data.path)

        // Obtener la cadena de direccion del producto
        const address = getObjetcKeyPath(data.path, this.searchKey)

        // Obtener el Id de la referencia ultima de la ubicacion del producto
        const [locationId] = findDeepestId(data.path, { filterKey: "locationId", depth: 0 })

        return new NestedLocationEntity(
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

    getAllProps(): NestedLocationRaw {
        return {
            locationId: this.id._value,
            address: this.props.address,
            path: this.props.path.getAllProps(),
        }
    }
}
