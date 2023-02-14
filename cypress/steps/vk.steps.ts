import commonUtils from "../utils/common.utils.js";
import StatusCodes from "http-status-codes"
import { locators} from "../resources/locators.js";
import { parameterizedLocators} from "../resources/parametrized.loc.js";

class VKSteps{
    public loginToMyPage(){
        cy.fixture("testdata").then((data) => {
            cy.xpath(locators.mainPageLoc).should("be.visible")
            cy.xpath(locators.phoneInputLocator).type(data.login)
            cy.xpath(locators.signInBtnLoc).click()
            cy.xpath(locators.loginPageLoc).should("be.visible")
            cy.xpath(locators.passwordInputLoc).type(data.password)
            cy.xpath(locators.continueBtnLoc).click()
            cy.xpath(locators.newsPageLoc).should("be.visible")
            cy.xpath(locators.myProfileBtnLoc).click()
            cy.xpath(locators.myProfilePageLoc).should("be.visible")
        })
    }
}

export default new VKSteps();