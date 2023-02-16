const Selector = require("../Selectors/Selectors");
class HomePage{
    async openHomePage(){
        await page.goto( Selector.homePageURL, {waitUntil: "domcontentloaded"});
    }

    async openRegistrationPage(){
        let registerLink = await page.waitForXPath(Selector.openLink("Register"), {visible: true});
        await registerLink.click();
    }

    async signInToAccount(userDetails){
        await page.waitForSelector(Selector.inputField("name='username'"));
        await page.type(Selector.inputField("name='username'"), userDetails.userName);
        await page.type(Selector.inputField("name='password'"), userDetails.password);
        let logInBTn = await page.waitForSelector(Selector.submitBtn('Log In'));
        await logInBTn.click();
        await page.waitForSelector(Selector.logedInText, {visible: true});
        expect(await page.$eval(Selector.logedInText, ele => ele.innerText)).toBe("Welcome "+userDetails.firstName+userDetails.firstName+" "+userDetails.lastName+userDetails.lastName);
    }

    async clickACOverviewLink(){
        let overviewAccountlink = await page.waitForXPath(Selector.openLink('Accounts Overview'), {visible: true});
        await overviewAccountlink.click();
    }

    async openNewAccountLink(){
        let openNewAccountlink = await page.waitForXPath(Selector.openLink('Open New Account'), {visible: true});
        await openNewAccountlink.click();
    }

    async openTransferFundsLink(){
        let transferFundsLink = await page.waitForXPath(Selector.openLink('Transfer Funds'), {visible: true});
        await transferFundsLink.click();
    }

    async openPayBillsLink(){
        let billsPayLink = await page.waitForXPath(Selector.openLink('Bill Pay'), {visible: true});
        await billsPayLink.click();
    }

    async openUpdateProfileLink(){
        let updateProfileLink = await page.waitForXPath(Selector.openLink('Update Contact Info'), {visible: true});
        await updateProfileLink.click();
    }

    async openRequestloanLink(){
        let requestLoanLink = await page.waitForXPath(Selector.openLink('Request Loan'), {visible: true});
        await requestLoanLink.click();
    }

    async logOut(){
        let logOutlink = await page.waitForXPath(Selector.openLink('Log Out'), {visible: true});
        await logOutlink.click();
    }
}
module.exports = HomePage;