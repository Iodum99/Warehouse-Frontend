import { AssetType } from "./asset-type"

export interface AssetListView{
    id: number
    userId: number
    author: string
    name: string
    description: string
    image: BigInt64Array
    assetType: AssetType
    uploadDate: Date
}