import { BaseEntity } from '@core/domain/entities/base.entity'
import { type LinkProps, LinkVO } from '../value-objects/link.vo'
import { DateVO } from '../value-objects/date.vo'
import {
    LocationLinkedListEntity,
    type LocationLinkedListRaw,
} from '../entities/location-linked-list.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { SupplierEntity, type SupplierProps } from '../entities/supplier.entity'
import { SKUVO } from '../value-objects/sku.vo'
import { MaskVO } from '../value-objects/mask.vo'
import {
    CategoryLinkedListEntity,
    type CategoryLinkedListRaw,
} from '../entities/category-linked-list.entity'
import { ItemBrandEntity, type ItemBrandRaw } from '../entities/brand.entity'

export interface CtgItemProps {
    itemName: string
    description: string
    reference: string // referencia de producto
    sku: SKUVO // Codigo unico del producto
    mask: MaskVO
    supplierProductName: string
    supplierProductCode: string
    supplier: SupplierEntity
    brand: ItemBrandEntity
    category: CategoryLinkedListEntity
    urls?: LinkVO[] // product url images
    location?: LocationLinkedListEntity
    createdAt: DateVO // fecha de creacion del articulo
    isActive: boolean
}

export type CtgItemRaw = Omit<
    CtgItemProps,
    | 'createdAt'
    | 'urls'
    | 'mask'
    | 'brand'
    | 'location'
    | 'category'
    | 'supplier'
    | 'sku'
> & {
    itemId?: string
    sku: string
    mask: string
    brand: ItemBrandRaw
    supplier: SupplierProps
    category: CategoryLinkedListRaw
    location?: LocationLinkedListRaw

    createdAt: number
    urls?: LinkProps[] | undefined
}

export class CtgItemAggregateRoot extends BaseEntity<CtgItemProps> {
    private constructor(props: CtgItemProps, itemId: UniqueIdentificatorVO) {
        super(props, itemId)
    }

    static fromRawData(data: CtgItemRaw): CtgItemAggregateRoot {
        const itemId = new UniqueIdentificatorVO(data.itemId)

        let urls: LinkVO[] | undefined
        let location: LocationLinkedListEntity | undefined

        /** Validar que clave "location" este definida y que el atributo path del objeto no sea nulo */
        if (hasRequiredKey(data, 'location') && data.location.path) {
            location = LocationLinkedListEntity.new(data.location)
        }

        if (hasRequiredKey(data, 'urls')) {
            urls = data.urls.map((ele) => LinkVO.create(ele))
        }

        const supplier = SupplierEntity.new(data.supplier)
        const category = CategoryLinkedListEntity.new(data.category)
        const mask = MaskVO.create(data.mask)
        const sku = SKUVO.create(mask, data.sku)
        const brand = ItemBrandEntity.new(data.brand)

        return new CtgItemAggregateRoot(
            {
                ...data,
                sku,
                urls,
                mask,
                brand,
                supplier,
                category,
                location,
                createdAt: DateVO.create(data.createdAt),
            },
            itemId
        )
    }

    toRawData(): Omit<CtgItemRaw, 'itemId'> {
        return {
            itemName: this.props.itemName,
            description: this.props.description,
            reference: this.props.reference,
            sku: this.props.sku.value,
            mask: this.props.mask.value,
            supplierProductName: this.props.supplierProductName,
            supplierProductCode: this.props.supplierProductCode,
            supplier: {
                supplierId: this.props.supplier.getId(),
            },
            brand: this.props.brand.getAllProps(),
            category: this.props.category.getAllProps(),
            location: this.props.location?.getAllProps(),
            isActive: this.props.isActive,
            createdAt: this.props.createdAt.toSeconds(),
            urls: this.props.urls
                ? this.props.urls.map((ele) => ele.getAllProps())
                : undefined,
        }
    }

    toResponse(): CtgItemRaw {
        return {
            itemName: this.props.itemName,
            description: this.props.description,
            reference: this.props.reference,
            sku: this.props.sku.value,
            mask: this.props.mask.value,
            supplierProductName: this.props.supplierProductName,
            supplierProductCode: this.props.supplierProductCode,
            supplier: this.props.supplier.getAllProps(),
            brand: this.props.brand.getAllProps(),
            category: this.props.category.getAllProps(),
            location: this.props.location?.getAllProps(),
            isActive: this.props.isActive,
            createdAt: this.props.createdAt.toSeconds(),
            urls: this.props.urls
                ? this.props.urls.map((ele) => ele.getAllProps())
                : undefined,
        }
    }
}
