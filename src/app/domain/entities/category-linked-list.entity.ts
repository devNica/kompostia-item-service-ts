import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'
import { findDeepestId } from '@core/shared/utils/object.utils'
import {
    CategoryNodeVO,
    type CategoryNodeProps,
} from '../value-objects/category-node.vo'

export interface CategoryLinkedListProps {
    path: CategoryNodeVO
}

export type CategoryLinkedListRaw = Omit<CategoryLinkedListProps, 'path'> & {
    categoryId: string
    path: CategoryNodeProps
}

export class CategoryLinkedListEntity extends BaseEntity<CategoryLinkedListProps> {
    private constructor(
        props: CategoryLinkedListProps,
        categoryId: UniqueIdentificatorVO
    ) {
        super(props, categoryId)
    }

    static new(data: CategoryLinkedListRaw): CategoryLinkedListEntity {
        const path = CategoryNodeVO.create(data.path)

        // Obtener el Id de la referencia ultima de la ubicacion del producto
        const [locationId] = findDeepestId(data.path, {
            filterKey: 'categoryId',
            depth: 0,
        })

        return new CategoryLinkedListEntity(
            {
                path,
            },
            new UniqueIdentificatorVO(locationId)
        )
    }

    getAllProps(): CategoryLinkedListRaw {
        return {
            categoryId: this.id._value,
            path: this.props.path.getAllProps(),
        }
    }
}
