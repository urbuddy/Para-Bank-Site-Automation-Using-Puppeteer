const Selector = require("../Selectors/Selectors");
class ACOverviewPage {
    async getFirstAccount(){
        await page.waitForSelector(Selector.firstACNoSelector, {visible: true});
        let account = await page.$eval(Selector.firstACNoSelector, ele => ele.innerText);
        let balance = await this.getAccountBalance(account);
        return {account1No: account, account1Balance: balance};
    }

    async getAccountBalance(account){
        await page.waitForXPath(Selector.accountBalance(account), {visible: true});
        let balance = await page.evaluate(element => {
            return element.textContent;
        }, (await page.$x(Selector.accountBalance(account)))[0]);
        return Number(balance.substring(1));
    }

    async verifyAccount(account){
        await page.waitForXPath(Selector.accountNoSelector(account), {visible: true});
        let resultantAccount = await page.evaluate(element => {
            return element.textContent;
        }, (await page.$x(Selector.accountNoSelector(account)))[0]);
        await expect(resultantAccount).toBe(account);
    }
}
module.exports = ACOverviewPage;