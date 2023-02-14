export default class UploadedPhoto {
    private _photo: string
    private _server: string
    private _hash: string

    constructor(photo: string = "", server: string = "", hash: string = "") {
        this._photo = photo;
        this._server = server;
        this._hash = hash;
    }

    get photo() {
        return this._photo;
    }

    get server() {
        return this._server;
    }

    get hash() {
        return this._hash;
    }

    set photo(value: string) {
        this._photo = value
    }

    set server(value: string) {
        this._server = value
    }

    set hash(value: string) {
        this._hash = value
    }
}