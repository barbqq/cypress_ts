export const parameterizedLocators = {
    post: (text, xpath = '') =>
        `//div[contains(text(),'${text}')]${xpath}`
}