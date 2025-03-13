import { UniqueIdentificatorVO } from '../value-objects/unique-identificator.vo'

export abstract class BaseEntity<T> {
    protected id: UniqueIdentificatorVO
    protected props: Readonly<T>

    constructor(props: T, id?: UniqueIdentificatorVO) {
        this.id = id ?? new UniqueIdentificatorVO()
        this.props = props
    }

    public equals(entity?: BaseEntity<T>): boolean {
        if (!entity) return false
        return this.id.equals(entity.id)
    }

    protected updateProps(newProps: Partial<T>): void {
        this.props = { ...this.props, ...newProps }
    }
}
