export interface CategoryNodeProps {
    categoryId?: string
    categoryName: string // nombre del almacen
    nomeclature: string // codigo de referencia
    path?: CategoryNodeProps | undefined
}

export class CategoryNodeVO {
    private constructor(private readonly props: CategoryNodeProps) {}

    static create(data: CategoryNodeProps): CategoryNodeVO {
        // Validar y clonar childrens (manteniendo la estructura simple)
        const childrens = data.path ? { ...data.path } : undefined

        return new CategoryNodeVO({
            ...data,
            path: childrens,
        })
    }

    getAllProps(): CategoryNodeProps {
        return {
            categoryId: this.props.categoryId,
            categoryName: this.props.categoryName,
            nomeclature: this.props.nomeclature,
            path: this.props.path,
        }
    }
}
