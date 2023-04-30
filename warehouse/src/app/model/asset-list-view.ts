import { AssetType } from "./asset-type"

export interface AssetListView{
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
}