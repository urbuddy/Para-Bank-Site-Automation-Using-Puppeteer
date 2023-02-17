const Selector = require("../Selectors/Selectors");
const ACOverviewPage = require("./ACOverviewPage");
const HomePage = require("./HomePage");
const homePage = new HomePage();
const overview = new ACOverviewPage();

class NewACCreatePage{
    async openNewAccount(newAccountDetails){
        await page.waitForNetworkIdle({idleTime: 100});
        await page.waitForSelector(Selector.accountType);
        if(newAccountDetails.accountType === "CHECKING"){
            await page.select(Selector.accountType, "0");
        }
        else {
            await page.select(Selector.accountType, "1");
        }
        
        await page.waitForSelector(Selector.optionValue(newAccountDetails.moneyTransferAccount));
        await page.select(Selector.fromAccountId, newAccountDetails.moneyTransferAccount);
        let newAccountSubmitBtn = await page.waitForSelector(Selector.submitBtn('Open New Account'), {visible: true});
        await newAccountSubmitBtn.click();
    }

    async verifyAndGetNewAccount(verificationDetails){
        await page.waitForXPath(Selector.headingText('Account Opened!'), {visible: true});
        let res = await page.evaluate(element => {
            return element.textContent;
        }, (await page.$x(Selector.paraAfterHeading('Account Opened!')))[0]);
        await expect(res).toBe(verificationDetails.confirmText);
        let newAccount = await page.$eval(Selector.newAccountId, ele => ele.innerText);
        await homePage.clickACOverviewLink(); 
        await overview.verifyAccount(newAccount);
        let newAccountBalance = await overview.getAccountBalance(newAccount);
        await expect(await overview.getAccountBalance(verificationDetails.firstAccount)).toBe(verificationDetails.balanceBeforeTransactionAC1 - newAccountBalance);
        return {accountNo: newAccount, accountBalance: newAccountBalance};
    }
}
module.exports = NewACCreatePage;