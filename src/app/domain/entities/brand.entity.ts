import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface ItemBrandProps {
    brandName: string
    isActive?: boolean
}

export type ItemBrandRaw = ItemBrandProps & {
    brandId?: string
}

export class ItemBrandEntity extends BaseEntity<ItemBrandProps> {
    private constructor(props: ItemBrandProps, brandId: UniqueIdentificatorVO) {
        super(props, brandId)
    }

    static new(data: ItemBrandRaw): ItemBrandEntity {
        const brandId = new UniqueIdentificatorVO(data.brandId)
        return new ItemBrandEntity(data, brandId)
    }

    getAllProps(): ItemBrandRaw {
        return {
            brandId: this.id._value,
            brandName: this.props.brandName,
            isActive: this.props.isActive,
        }
    }
}
