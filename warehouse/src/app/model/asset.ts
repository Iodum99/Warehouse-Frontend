import { AssetType } from "./asset-type"

export class Asset{
    id: number
    userId: number
    author: string
    name: string
    description: string
    filePath: string
    imagePaths: string[]
    assetType: AssetType
    uploadDate: Date
    lastModifiedDate: Date
    downloads: number
    userIdLikes: number[]
    tags: string[]
    extensions: string[]
    size: number

    constructor(){
        this.id = 0
        this.userId = 0
        this.author = ""
        this.name = ""
        this.description = "No description to show..."
        this.filePath = ""
        this.imagePaths = []
        this.assetType = AssetType.OBJECT
        this.uploadDate = new Date()
        this.lastModifiedDate = new Date()
        this.downloads = 0
        this.userIdLikes = []
        this.tags = []
        this.extensions = []
        this.size = 0
    }
}