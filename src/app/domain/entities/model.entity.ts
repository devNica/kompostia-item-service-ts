import { DomainErrorPresenter } from '@core/application/presenters/domain-error.presenter'
import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

interface ElectricSpecifications {
    source: {
        voltage: '110v' | '120v' | '220v' | '230v' | '240v'
        frequency: '50hz' | '60hz'
    }
    watts: string
    type: AppliancesAllowed
}

export type AudioSpecifications = ElectricSpecifications & {
    radio?: {
        band: 'AM' | 'FM' | 'AM|FM' | 'AM|FM|SW'
    }
    bluethoot: boolean
    cd: boolean
    usb: boolean
    pmpo: string
}

export type VideoSpecifications = ElectricSpecifications & {
    size: string
    type: 'LCD' | 'QLED' | 'OLED'
    resolution: 'FULLHD' | '4K' | '8K' | 'UHD'
    smartTv: boolean
    artificialInteligence: boolean
}

export type ComputerSpecifications = ElectricSpecifications & {
    disk: string
    ram: string
    cpu: string
    gpu?: string
    display?: string
    type: 'DESKTOP' | 'LAPTOP'
}

export type AppliancesAllowed = 'Audio' | 'Video' | 'Computer'

export type ApplianceSpecification =
    | AudioSpecifications
    | VideoSpecifications
    | ComputerSpecifications

export interface ProductModelProps<T extends ApplianceSpecification> {
    modelName: string
    isActive?: boolean
    especificacions: T
    type: AppliancesAllowed
}

export type ProductModelRaw<T extends ApplianceSpecification> = Omit<
    ProductModelProps<T>,
    'type'
> & {
    modelId?: string
    type: string
}

export class ProductModelEntity<
    T extends ApplianceSpecification,
> extends BaseEntity<ProductModelProps<T>> {
    private constructor(
        props: ProductModelProps<T>,
        modelId: UniqueIdentificatorVO
    ) {
        super(props, modelId)
    }

    static create<E extends ApplianceSpecification>(
        data: ProductModelRaw<E>
    ): ProductModelEntity<E> {
        const modelId = new UniqueIdentificatorVO(data.modelId)

        if (!ProductModelEntity.isValidType(data.type)) {
            throw new DomainErrorPresenter(
                `Tipo Invalido: ${data.type}`,
                'Error|ProductModelEntity'
            )
        }

        if (data.especificacions.type !== data.type) {
            throw new DomainErrorPresenter(
                `El Tipo es incompatible con las especificiones: ${data.type}`,
                'Error|ProductModelEntity'
            )
        }

        return new ProductModelEntity(
            {
                modelName: data.modelName,
                type: data.type as AppliancesAllowed,
                especificacions: data.especificacions,
            },
            modelId
        )
    }

    private static isValidType(type: string): type is AppliancesAllowed {
        return ['Electronic', 'Game', 'Audio', 'Video', 'Computer'].includes(
            type
        )
    }
}
