import { type ImageMetaDataI } from '@app/application/ports/repositories/catalog-item.repository'
import { type CategoryNodeProps } from '@app/domain/value-objects/child-node-category.vo'
import { type LinkProps } from '@app/domain/value-objects/link.vo'
import constants from '@core/shared/constants'
import { type KomposeInterfaces } from '@devnica/kompostia-models-ts'
import { type LocationNodeProps } from '@app/domain/value-objects/child-node-location.vo'

export function mapLocationTreeToAggregateProps(
    data: KomposeInterfaces.StorageLocationStructureRawI[]
): LocationNodeProps {
    return data.reduce((acc: any, loc) => {
        return {
            locationId: loc.id,
            name: loc.locationName,
            nomeclature: loc.nomeclature,
            ref: loc.parentId,
            type: loc.locationType,
            path: acc || null,
        }
    }, null)
}

export function mapCategoryTreeToAggregateProps(
    data: KomposeInterfaces.CategoryStructureRawI[]
): CategoryNodeProps {
    return data.reduce((acc: any, cat) => {
        return {
            categoryId: cat.id,
            name: cat.categoryName,
            nomeclature: cat.nomeclature,
            path: acc || null,
        }
    }, null)
}

export function mapImageMetadataToURL(
    data: ImageMetaDataI[] | undefined,
    baseURL: string
): LinkProps[] | undefined {
    if (!data) return undefined

    return data.map((ele) => {
        return {
            url: `${baseURL}${constants.PREFIX}/file/${ele.id}`,
        }
    })
}
