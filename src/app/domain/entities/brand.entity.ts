import { DomainErrorPresenter } from '@core/application/presenters/domain-error.presenter'
import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface ItemBrandProps {
    brandName: string
    isActive?: boolean
}

export type ItemBrandRaw = ItemBrandProps & {
    brandId: string
}

export class ItemBrandEntity extends BaseEntity<ItemBrandProps> {
    private _persistedId: boolean = false
    
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

    setPersistentId(brandId: string):void{
        if (this._persistedId) {
            throw new DomainErrorPresenter(
                'El ID de la marca de articulo ya ha sido persistido y no puede cambiarse',
                'brand-entity'
            )
        }

        this.id = new UniqueIdentificatorVO(brandId)
        this._persistedId = true
    }

}
