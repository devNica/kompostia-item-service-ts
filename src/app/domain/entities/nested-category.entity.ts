import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'
import { findDeepestId } from '@core/shared/utils/object.utils'
import {
    ChildNodeCategoryVO,
    type CategoryNodeProps,
} from '../value-objects/child-node-category.vo'

export interface NestedCategoryProps {
    path: ChildNodeCategoryVO
}

export type NestedCategoryRaw = Omit<NestedCategoryProps, 'path'> & {
    categoryId: string
    path: CategoryNodeProps
}

export class NestedCategoryEntity extends BaseEntity<NestedCategoryProps> {
    private constructor(
        props: NestedCategoryProps,
        categoryId: UniqueIdentificatorVO
    ) {
        super(props, categoryId)
    }

    static new(data: NestedCategoryRaw): NestedCategoryEntity {
        const path = ChildNodeCategoryVO.create(data.path)

        // Obtener el Id de la referencia ultima de la ubicacion del producto
        const [locationId] = findDeepestId(data.path, {
            filterKey: 'categoryId',
            depth: 0,
        })

        return new NestedCategoryEntity(
            {
                path,
            },
            new UniqueIdentificatorVO(locationId)
        )
    }

    getAllProps(): NestedCategoryRaw {
        return {
            categoryId: this.id._value,
            path: this.props.path.getAllProps(),
        }
    }
}
