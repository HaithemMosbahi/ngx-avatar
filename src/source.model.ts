export interface Source{
    sourceKey:string;
    sourceValue:string;
}

/**
 * Contract of all Sources.
 * Every source must implements the fetch mehod
 * in order to provide the avatar source.
 * 
 * @export
 * @interface ISource
 */
export interface ISource{
    
    fetch():string;
}


/**
 * Facebook source impelementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 * 
 * @export
 * @class Facebook
 * @implements {ISource}
 */
export class Facebook implements ISource{
    private _sourceId:string;
    private _size:number;

    constructor(sourceId:string,size:number){
        this._sourceId = sourceId;
        this._size = size;
    }

    fetch():string{
       return 'https://graph.facebook.com/' +
      `${this._sourceId}/picture?width=${this._size}&height=${this._size}`;
    }
}

export class Google implements ISource{
    private _sourceId:string;

    constructor(sourceId:string){
        this._sourceId = sourceId;
    }

    fetch():string{
      return "";
    }
}