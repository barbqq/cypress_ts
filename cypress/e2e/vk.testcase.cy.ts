import VkSteps from "../steps/vk.steps";

describe("Test of VK UI and VK API",()=>{
    beforeEach(()=>{
        cy.fixture("vkendpoints").then((data) =>{
            cy.visit(data.vk_url)
        })
    })
    it("Test of VK UI and VK API",() => {
        VkSteps.loginToMyPage();
        VkSteps.createPost();
        VkSteps.editPost();
        VkSteps.addComment();
        VkSteps.addLike();
        VkSteps.deletePost();
    })
})