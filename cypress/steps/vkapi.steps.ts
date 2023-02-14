import HttpMethod from "http-method-enum"
import { VkEndpoints } from "../resources/vkapi.enum"
import { Params } from "../customtypes/custom.types"
import testData from "../fixtures/testdata.json"
import UploadedPhoto from "../models/uploaded.photo"

class VkApiSteps{

    public createPost(message: string){
        let params = this.commonParams()
        params.message = message
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VkEndpoints.CREATE_POST),
            qs : params
        })
    }

    public addComment(message : string,postId: string){
        let params = this.commonParams()
        params.message = message
        params.post_id = postId
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VkEndpoints.CREATE_COMMENT),
            qs : params
        })
    }

    public checkLikes(ownerId: string,type: string,itemId: string){
        let params = this.commonParams()
        params.user_id = ownerId
        params.type = type
        params.item_id = itemId
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VkEndpoints.CHECK_LIKES),
            qs : params
        })
    }

    public deletePost(postId : string){
        let params = this.commonParams()
        params.post_id = postId
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VkEndpoints.DELETE_POST),
            qs : params
        })
    }

    public getWallPhotoUploadUrl(){
        let params = this.commonParams()
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VkEndpoints.GET_WALL_UPLOAD_URL),
            qs: params
        })
    }

    public updatePost(text : string,photoId : string,postId : string){
        let params = this.commonParams()
        params.post_id = postId
        params.message = text
        params.attachments = testData.type_of_upload_file + testData.owner_id + "_" + photoId
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VkEndpoints.EDIT_WALL_PHOTO),
            qs: params
        })
    }

    public updateWallPost(randomString : string,postId : string){
        return this.getWallPhotoUploadUrl().then((resp)=>{
            let url = resp.body.response.upload_url
            cy.customerUploadFile(url,testData.expected_image_name,testData.expected_image_name,testData.mime_type)
                .then(resp=>{
                    this.saveUploadWallPhoto(resp).then((subResp)=>{
                        let photoId = subResp.body.response[0].id
                        this.updatePost(randomString,photoId,postId)
                    })
                })
        })
    }

    public saveUploadWallPhoto(uploadPhoto){
        let params = this.commonParams()
        params.photo = uploadPhoto.photo
        params.server = uploadPhoto.server
        params.hash = uploadPhoto.hash
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VkEndpoints.SAVE_WALL_PHOTO),
            qs: params
        })

    }

    private commonParams() : Params{        
        let params:Params = {
            access_token: testData.token,
            v: testData.api_version,
            owner_id: testData.owner_id
        }
        return params;
    }

    private formUrl(endpoint:string) : string{
        return testData.vk_api_url + endpoint
    }
}

export default new VkApiSteps()