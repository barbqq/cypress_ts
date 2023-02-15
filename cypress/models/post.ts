export default class Post{
    [x: string]: any;
    private _id:string
    private _message:string

    constructor(id:string = "", message:string = ""){
        this._id = id;
        this._message = message;
    }

    get id():string{
        return this._id;
    }

    get message():string{
        return this._message;
    }

    set message(value:string){
        this._message = value;
    }

    set id(value:string){
        this._id = value;
    }


}

