const Selector = require("../Selectors/Selectors");
class FundsTransferPage{
    async transferFunds(details){
        await page.waitForNetworkIdle({idleTime: 100});
        await page.waitForSelector(Selector.amount);
        await page.type(Selector.amount, details.amount);
        await page.waitForSelector(Selector.fromAccountId+" "+Selector.optionValue(details.moneyTransferAccount));
        await page.select(Selector.fromAccountId, details.moneyTransferAccount);
        await page.waitForSelector(Selector.toAccountId+" "+Selector.optionValue(details.moneyRecieveAccount));
        await page.select(Selector.toAccountId, details.moneyRecieveAccount);
        let transferBtn = await page.waitForSelector(Selector.submitBtn('Transfer'), {visible: true});
        await transferBtn.click();
    }

    async verifyFundTransfered(details){
        await page.waitForXPath(Selector.headingText('Transfer Complete!'), {visible: true});
        await page.waitForSelector(Selector.amount);
        expect(await page.$eval(Selector.amount, ele => ele.innerText)).toBe("$"+details.amount+".00");
        expect(await page.$eval(Selector.fromAccountId, ele => ele.innerText)).toBe(details.moneyTransferAccount);
        expect(await page.$eval(Selector.toAccountId, ele => ele.innerText)).toBe(details.moneyRecieveAccount);
    }
}
module.exports = FundsTransferPage;