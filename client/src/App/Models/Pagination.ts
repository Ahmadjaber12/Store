export interface MetaData{
    currentPage:number,
    totalPages:number,
    totalPagesCount:number,
    pageSize:number,
}

export class PaginatResponse<T>{
    items:T;
    metaData:MetaData;
    constructor(items:T,metaData:MetaData) {
        this.items=items;
        this.metaData=metaData
        
    }
}
