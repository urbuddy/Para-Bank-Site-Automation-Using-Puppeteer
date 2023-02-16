const Selector = require("../Selectors/Selectors");

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

    async verifyResponseTextAndGetNewAccount(result){
        await page.waitForXPath(Selector.headingText('Account Opened!'), {visible: true});
        let res = await page.evaluate(element => {
            return element.textContent;
        }, (await page.$x(Selector.paraAfterHeading('Account Opened!')))[0]);
        expect(res).toBe(result);
        return await page.$eval(Selector.newAccountId, ele => ele.innerText);
    }
}
module.exports = NewACCreatePage;