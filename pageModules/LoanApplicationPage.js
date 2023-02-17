const Selector = require("../Selectors/Selectors");
const ACOverviewPage = require("./ACOverviewPage");
const HomePage = require("./HomePage");
const homePage = new HomePage();
const overview = new ACOverviewPage();

class LoanApplicationPage{
    async applyForALoan(loanDetails){
        await page.waitForNetworkIdle({idleTime: 100});
        await page.waitForSelector(Selector.amount);
        await page.type(Selector.amount, loanDetails.amount);
        await page.type(Selector.downPayment, loanDetails.downPayment);
        await page.waitForSelector(Selector.fromAccountId+" "+Selector.optionValue(loanDetails.downPaymentTransferAC));
        await page.select(Selector.fromAccountId, loanDetails.downPaymentTransferAC);
        let applytBtn = await page.waitForSelector(Selector.submitBtn('Apply Now'), {visible: true});
        await applytBtn.click();
    }

    async verifyLoanApprovedAndGetNewLoanAccount(result){
        await page.waitForXPath(Selector.headingText('Loan Request Processed'), {visible: true});
        await page.waitForSelector(Selector.loanProvider);
        expect(await page.$eval(Selector.loanProvider, ele => ele.innerText)).toBe(result.loanProvider);
        expect(await page.$eval(Selector.responceDate, ele => ele.innerText)).toBe(result.loanApprovalDate);
        expect(await page.$eval(Selector.loanStatus, ele => ele.innerText)).toBe(result.loanApplicationStatus);
        let res = await page.evaluate(element => {
            return element.textContent;
        }, (await page.$x(Selector.paraAfterHeading('Loan Request Processed')))[0]);
        await expect(res).toBe(result.responseText);
        let newLoanAccount = await page.$eval(Selector.newAccountId, ele => ele.innerText);
        await homePage.clickACOverviewLink(); 
        await overview.verifyAccount(newLoanAccount);
        await expect(await overview.getAccountBalance(result.downPaymentAccountNo)).toBe(result.beforeDownPaymentACBalance - Number(result.downPayment));
    }
}
module.exports = LoanApplicationPage;