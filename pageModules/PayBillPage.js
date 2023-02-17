const Selector = require("../Selectors/Selectors");
const ACOverviewPage = require("./ACOverviewPage");
const HomePage = require("./HomePage");
const homePage = new HomePage();
const overview = new ACOverviewPage();

class PayBillPage{
    async submitFormOfBill(payeeDetails){
        await page.waitForNetworkIdle({idleTime: 100});
        await page.waitForSelector(Selector.inputField("name='payee.name'"));
        await page.type(Selector.inputField("name='payee.name'"), payeeDetails.name);
        await page.type(Selector.inputField("name='payee.address.street'"), payeeDetails.street);
        await page.type(Selector.inputField("name='payee.address.city'"), payeeDetails.city);
        await page.type(Selector.inputField("name='payee.address.state'"), payeeDetails.state);
        await page.type(Selector.inputField("name='payee.address.zipCode'"), payeeDetails.pincode);
        await page.type(Selector.inputField("name='payee.phoneNumber'"), payeeDetails.phoneNo);
        await page.type(Selector.inputField("name='payee.accountNumber'"), payeeDetails.accountNo);
        await page.type(Selector.inputField("name='verifyAccount'"), payeeDetails.accountNo);
        await page.type(Selector.inputField("name='amount'"), payeeDetails.amount);
        await page.waitForSelector(Selector.select+" "+Selector.optionValue(payeeDetails.moneyTransferAccount));
        await page.select(Selector.select, payeeDetails.moneyTransferAccount);
        let sendPaymentBtn = await page.waitForSelector(Selector.submitBtn('Send Payment'), {visible: true});
        await sendPaymentBtn.click();
    }

    async verifyBillPaid(payeeDetails){
        await page.waitForXPath(Selector.headingText('Bill Payment Complete'), {visible: true});
        await page.waitForSelector(Selector.payeeName);
        await expect(await page.$eval(Selector.payeeName, ele => ele.innerText)).toBe(payeeDetails.name);
        await expect(await page.$eval(Selector.amount, ele => ele.innerText)).toBe("$"+payeeDetails.amount+".00");
        await expect(await page.$eval(Selector.fromAccountId, ele => ele.innerText)).toBe(payeeDetails.moneyTransferAccount);
        await homePage.clickACOverviewLink();
        await expect(await overview.getAccountBalance(payeeDetails.moneyTransferAccount)).toBe(payeeDetails.beforeBillPayAccountBalance - Number(payeeDetails.amount));
    }
}
module.exports = PayBillPage;