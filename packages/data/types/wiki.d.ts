
type Block = {
    type: string
    class: string[]
    html: string
}

type Section = {
    heading: string
    content: Block[]
}

type Content = Section[]

type IndexItem = {
    heading: string
    index: number
}

type ScrapyFile = {
    url: string
    path: string
    checksum: string
    status: string
}

export type WikiData = {
    heading: string
    tagline: string
    Z:  string
    symbol: string
    content: Content
    index: IndexItem[]
    file_urls: string[]
    files: ScrapyFile[]
}