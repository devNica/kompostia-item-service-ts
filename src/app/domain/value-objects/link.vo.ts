export interface LinkProps {
    url: string
}

export class LinkVO {
    private constructor(private readonly props: LinkProps) {}

    static create(data: LinkProps): LinkVO {
        return new LinkVO(data)
    }

    get url(): string {
        return this.props.url
    }

    getAllProps(): LinkProps {
        return {
            url: this.props.url,
        }
    }
}
