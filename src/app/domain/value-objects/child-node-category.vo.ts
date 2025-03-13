export interface CategoryNodeProps {
    categoryId?: string
    name: string // nombre del almacen
    nomeclature: string // codigo de referencia
    path?: CategoryNodeProps | undefined
}

export class ChildNodeCategoryVO {
    private constructor(private readonly props: CategoryNodeProps) {}

    static create(data: CategoryNodeProps): ChildNodeCategoryVO {
        // Validar y clonar childrens (manteniendo la estructura simple)
        const childrens = data.path ? { ...data.path } : undefined

        return new ChildNodeCategoryVO({
            ...data,
            path: childrens,
        })
    }

    getAllProps(): CategoryNodeProps {
        return {
            categoryId: this.props.categoryId,
            name: this.props.name,
            nomeclature: this.props.nomeclature,
            path: this.props.path,
        }
    }
}
