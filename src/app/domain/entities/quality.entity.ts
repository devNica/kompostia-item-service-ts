import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface QualityProps {
    qltId: string
    assurance?: string
    maxPerformance?: number // 100 | 85 | 65 | 45
    minPerformance?: number // 85  | 65 | 45 | 0
}

export class QualityEntity extends BaseEntity<QualityProps> {
    private constructor(props: QualityProps, qltId: UniqueIdentificatorVO) {
        super(props, qltId)
    }

    static new(data: QualityProps | undefined): QualityEntity {
        if (!data) throw new Error('Relacion de calidad no definida')
        return new QualityEntity(data, new UniqueIdentificatorVO(data.qltId))
    }

    getId(): string {
        return this.id._value
    }

    getAllProps(): QualityProps {
        return {
            qltId: this.id._value,
            assurance: this.props.assurance,
            maxPerformance: this.props.maxPerformance,
            minPerformance: this.props.minPerformance,
        }
    }
}
