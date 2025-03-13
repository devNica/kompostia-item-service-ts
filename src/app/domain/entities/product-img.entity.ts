import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface ProductImgProps {
    filesize: number
    filetype: string
    binary: Buffer
}

export type ProductImgRaw = ProductImgProps & {
    fileId?: string
}

export class ProductImgEntity extends BaseEntity<ProductImgProps> {
    private constructor(
        props: ProductImgProps,
        fileId?: UniqueIdentificatorVO
    ) {
        super(props, fileId)
    }

    static fromRawData(data: ProductImgRaw): ProductImgEntity {
        let fileId: UniqueIdentificatorVO | undefined

        if (data.fileId) {
            fileId = new UniqueIdentificatorVO(data.fileId)
        }

        return new ProductImgEntity(data, fileId)
    }

    getAllProps(): Omit<ProductImgRaw, 'fileId'> {
        return {
            binary: this.props.binary,
            filesize: this.props.filesize,
            filetype: this.props.filetype,
        }
    }
}
