import { type MultiLangI } from '@core/application/models/app/app.model'
import { DomainErrorPresenter } from '@core/application/presenters/domain-error.presenter'
import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface CategoryProps {
    categoryName: string
    nomeclature: string
    parentId: string | null
    multiLangCategory: MultiLangI[] | []
    multiLangIsActive: boolean
    parentName?: string | null
    isActive?: boolean
}

export type CategoryRaw = CategoryProps & {
    categoryId?: string | undefined
}

export class CategoryEntity extends BaseEntity<CategoryProps> {
    private _persistedId: boolean = false
    private constructor(
        props: CategoryProps,
        categoryId: UniqueIdentificatorVO
    ) {
        super(props, categoryId)
    }

    static create(data: CategoryRaw): CategoryEntity {
        const categoryId = new UniqueIdentificatorVO(data.categoryId)

        if (data.multiLangIsActive && data.multiLangCategory.length < 1) {
            throw new DomainErrorPresenter(
                `Comprobacion de multi-idioma ha fallado para el registro: ${data.categoryId}`,
                'CategoryEntity'
            )
        }

        if (categoryId._value === data.parentId) {
            throw new DomainErrorPresenter(
                `La categorial actual no puede referenciarse a si misma como su ancestro directo`,
                'CategoryEntity'
            )
        }

        return new CategoryEntity(data, categoryId)
    }

    getAllProps(): CategoryRaw {
        return {
            categoryId: this.id._value,
            ...this.props,
        }
    }

    setPersistentId(categoryId: string): void {
        if (this._persistedId) {
            throw new DomainErrorPresenter(
                'El ID ya fue persistido',
                'CategoryTree'
            )
        }

        this.id = new UniqueIdentificatorVO(categoryId)
        this._persistedId = true
    }
}
