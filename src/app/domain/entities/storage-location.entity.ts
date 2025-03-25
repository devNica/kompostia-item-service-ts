import { DomainErrorPresenter } from '@core/application/presenters/domain-error.presenter'
import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { type KomposeSchemas } from '@devnica/kompostia-models-ts'

export interface LocationTypeRaw {
    locationTypeId: string
    name: string
    rules: KomposeSchemas.SuggestedLocationsI[]
}

export interface Rules {
    parent?: LocationTypeRaw
    child: LocationTypeRaw
}

export interface StorageLocationProps {
    locationName: string
    nomeclature: string
    parentId: string | null
    parentName?: string | null
    locationTypeId: string
    type?: KomposeSchemas.SuggestedLocationsI // tipo de ubicacion
    hasAccounting: boolean
    isActive?: boolean
}

export type StorageLocationRaw = Omit<
    StorageLocationProps,
    'type' | 'parentType'
> & {
    locationId?: string
    type?: string | undefined
}

export class StorageLocationEntity extends BaseEntity<StorageLocationProps> {
    private _persistedId: boolean = false

    private static readonly typeLocationsAllowed: KomposeSchemas.SuggestedLocationsI[] =
        [
            'hubs',
            'warehouse',
            'island',
            'zones',
            'containerBox',
            'drawer',
            'palet',
            'platform',
            'shelf',
            'shelfFloor',
            'shelfSection',
        ]

    private constructor(
        props: StorageLocationProps,
        categoryId: UniqueIdentificatorVO
    ) {
        super(props, categoryId)
    }

    static set(data: StorageLocationRaw): StorageLocationEntity {
        const locationId = new UniqueIdentificatorVO(data.locationId)

        if (locationId._value === data.parentId) {
            throw new DomainErrorPresenter(
                `La ubicacion actual no puede referenciarse a si misma como su ancestro directo`,
                'LocationEntity'
            )
        }

        if (data.type) {
            const verify = this.typeLocationsAllowed.some(
                (item) => item === data.type
            )
            if (!verify) {
                throw new DomainErrorPresenter(
                    'Fallo la validacion del tipo de la ubicacion',
                    'LocationEntity'
                )
            }
        }

        return new StorageLocationEntity(
            {
                ...data,
                type: hasRequiredKey(data, 'type')
                    ? (data.type as KomposeSchemas.SuggestedLocationsI)
                    : undefined,
            },
            locationId
        )
    }

    static create(
        data: StorageLocationRaw,
        rules: Rules
    ): StorageLocationEntity {
        const locationId = new UniqueIdentificatorVO(data.locationId)

        if (locationId._value === data.parentId) {
            throw new DomainErrorPresenter(
                `La ubicacion actual no puede referenciarse a si misma como su ancestro directo`,
                'LocationEntity'
            )
        }

        // Si la ubicacion actual esta siendo referenciada a una ubicacion padre
        if (data.parentId && rules.parent) {
            const { parent, child } = rules

            if (!parent.rules.some((ele) => ele === child.name)) {
                throw new DomainErrorPresenter(
                    `El tipo de la ubicacion padre (${parent.name}), no permite hijos de tipo: ${child.name}`,
                    'LocationEntity'
                )
            }
        } else if (data.parentId && !rules.parent) {
            throw new DomainErrorPresenter(
                'No se han definido las reglas de ubicacion para la referencia padre',
                'LocationEntity'
            )
        }

        if (data.type) {
            const verify = this.typeLocationsAllowed.some(
                (item) => item === data.type
            )
            if (!verify) {
                throw new DomainErrorPresenter(
                    'Fallo la validacion del tipo de la ubicacion',
                    'LocationEntity'
                )
            }
        }

        return new StorageLocationEntity(
            {
                ...data,
                type: hasRequiredKey(data, 'type')
                    ? (data.type as KomposeSchemas.SuggestedLocationsI)
                    : undefined,
            },
            locationId
        )
    }

    getAllProps(): StorageLocationRaw {
        return {
            locationId: this.id._value,
            ...this.props,
        }
    }

    setPersistentId(locationId: string): void {
        if (this._persistedId) {
            throw new DomainErrorPresenter(
                'El ID ya fue persistido',
                'LocationEntity'
            )
        }

        this.id = new UniqueIdentificatorVO(locationId)
        this._persistedId = true
    }
}
