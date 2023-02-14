import HttpMethod from "http-method-enum";
import Jimp from "jimp"
import UploadedPhoto from "../models/uploaded.photo";
class CommonUtls{
    public generateRandomString(length: number) : string{
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = "";
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public formRequest(url : string, formData : FormData) {
        const request = new XMLHttpRequest();
        request.open(HttpMethod.POST, url, false);
        request.send(formData);
        return JSON.parse(request.response);
    }

    public customerUploadFile(url : string, file : string, fileName : string, fileType : string) {
        return cy.fixture(file,'base64').then((binary) => {
            return Cypress.Blob.base64StringToBlob(binary,fileType)
        })
            .then((blob) => {
                const formData = new FormData();
                formData.set('file', blob, fileName);
                return this.formRequest(url, formData);
            })
    }

    public async compareImages(actualPath:string ,expectedPath : string ){        
          const actual = await Jimp.read(actualPath);
          const expected = await Jimp.read(expectedPath);
          const pixelDifference =  Jimp.diff(actual, expected).percent;
          const distance =  Jimp.distance(actual, expected);
          return distance < 0.20 || pixelDifference < 0.20;
    }
    
}
declare global {
    namespace Cypress{
        interface Chainable {
            customerUploadFile(url : string, file : string, fileName : string, fileType : string): any,
            compareImages(actualPath: string,expectedPath: string): Promise<boolean>
        }
    }
}

export default new CommonUtls();