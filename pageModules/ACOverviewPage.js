const Selector = require("../Selectors/Selectors");
class ACOverviewPage {
    async getFirstAccount(){
        await page.waitForSelector(Selector.firstACNoSelector, {visible: true});
        return await page.$eval(Selector.firstACNoSelector, ele => ele.innerText); 
    }

    async verifyAccount(account){
        await page.waitForXPath(Selector.accountNoSelector(account), {visible: true});
        let resultantAccount = await page.evaluate(element => {
            return element.textContent;
        }, (await page.$x(Selector.accountNoSelector(account)))[0]);
        
        expect(resultantAccount).toBe(account);
    }
}
module.exports = ACOverviewPage;