import { DomainErrorPresenter } from '@core/application/presenters/domain-error.presenter'
import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface SupplierProps {
    supplierId?: string
    supplierCode: string
    supplierName: string
    isActive?: boolean
}

export class SupplierEntity extends BaseEntity<SupplierProps> {
    private _persistedId: boolean = false

    private constructor(
        props: SupplierProps,
        supplierId: UniqueIdentificatorVO
    ) {
        super(props, supplierId)
    }

    static new(data: SupplierProps): SupplierEntity {
       
        return new SupplierEntity(
            data,
            new UniqueIdentificatorVO(data.supplierId)
        )
    }

    getId(): string {
        return this.id._value
    }

    getAllProps(): SupplierProps {
        return {
            supplierId: this.id._value,
            supplierCode: this.props.supplierCode,
            supplierName: this.props.supplierName,
            isActive: this.props.isActive
        }
    }

    setPersistentId(supplierId: string):void{
            if (this._persistedId) {
                throw new DomainErrorPresenter(
                    'El ID del proveedor ya ha sido persistido y no puede cambiarse',
                    'supplier-entity'
                )
            }
    
            this.id = new UniqueIdentificatorVO(supplierId)
            this._persistedId = true
        }
}
