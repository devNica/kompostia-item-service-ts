import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface SupplierProps {
    supplierId: string
    supplierCode?: string
    supplierName?: string
}

export class SupplierEntity extends BaseEntity<SupplierProps> {
    private constructor(
        props: SupplierProps,
        supplierId: UniqueIdentificatorVO
    ) {
        super(props, supplierId)
    }

    static new(data: SupplierProps | undefined): SupplierEntity {
        if (!data) throw new Error('Relacion de proveedor indefinida')

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
        }
    }
}
