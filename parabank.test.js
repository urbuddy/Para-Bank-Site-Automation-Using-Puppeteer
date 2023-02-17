const HomePage = require("./pageModules/HomePage");
const RegisterPage = require("./pageModules/RegisterPage");
const ACOverviewPage = require("./pageModules/ACOverviewPage");
const NewACCreatePage = require("./pageModules/NewACCreatePage");
const FundsTransferPage = require("./pageModules/FundsTransferPage");
const PayBillPage = require("./pageModules/PayBillPage");
const UpdateProfilePage = require("./pageModules/UpdateProfilePage");
const LoanApplicationPage = require("./pageModules/LoanApplicationPage");
const homePage = new HomePage();
const register = new RegisterPage();
const overview = new ACOverviewPage();
const openNewAccount = new NewACCreatePage();
const transferMoney = new FundsTransferPage();
const payBill = new PayBillPage();
const updateprofile = new UpdateProfilePage();
const loanApplication = new LoanApplicationPage();


describe("Para Bank Web-Site Automation", () => {

    test("Sign Up to Log Out from Site", async () => {

        await homePage.openHomePage();

        await homePage.openRegistrationPage();
        let userDetails = {
            firstName: "AAA",
            lastName: "BBB",
            street: "CCC",
            city: "DDD",
            state: "EEE",
            pincode: "12345",
            phoneNo: "1234567890",
            ssn: "123456789098",
            userName: "JJJ",
            password: "AAAbbb@123"
        }
        await register.accountRegistration(userDetails);
        await register.verifyUserRegistered(userDetails, "Your account was created successfully. You are now logged in.");


        // await homePage.signInToAccount(userDetails);
        
        
        await homePage.clickACOverviewLink();
        let account1 = await overview.getFirstAccount();


        await homePage.openNewAccountLink();
        let newAccountFormDetails = {
            accountType: "CHECKING",
            moneyTransferAccount: account1.account1No
        };
        await openNewAccount.openNewAccount(newAccountFormDetails);
        let verificationDetails = {
            firstAccount: account1.account1No,
            balanceBeforeTransactionAC1: account1.account1Balance,
            confirmText: "Congratulations, your account is now open."
        };
        let account2 = await openNewAccount.verifyAndGetNewAccount(verificationDetails);
        let account1Balance = await overview.getAccountBalance(account1.account1No);


        await homePage.openTransferFundsLink();
        let details = {
            amount: "2",
            moneyTransferAccount: account1.account1No,
            moneyRecieveAccount: account2. accountNo,
            beforeMoneyTransferAccountBalance: account1Balance,
            beforeMoneyRecieveAccountBalance: account2.accountBalance
        };
        await transferMoney.transferFunds(details);
        await transferMoney.verifyFundTransfered(details);
        account1Balance = await overview.getAccountBalance(account1.account1No);


        await homePage.openPayBillsLink();
        let payeeDetails = {
            name: "AAA",
            street: "CCC",
            city: "DDD",
            state: "EEE",
            pincode: "12345",
            phoneNo: "0987654321",
            accountNo: "1234",
            amount: "2",
            moneyTransferAccount: account1.account1No,
            beforeBillPayAccountBalance: account1Balance
        };
        await payBill.submitFormOfBill(payeeDetails);
        await payBill.verifyBillPaid(payeeDetails);
        

        await homePage.openUpdateProfileLink();
        let newUserDetails = {
            firstName: "AAA",
            lastName: "BBB",
            street: "CCC",
            city: "SSS",
            state: "EEE",
            pincode: "12345",
            phoneNo: "1234567890"
        };
        await updateprofile.updateProfileDetails(newUserDetails);
        await updateprofile.verifyProfileUpdated("Your updated address and phone number have been added to the system. ");


        await homePage.clickACOverviewLink(); 
        account1Balance = await overview.getAccountBalance(account1.account1No);


        await homePage.openRequestloanLink();
        let loanApplicationDetails = {
            amount: "200",
            downPayment: "20",
            downPaymentTransferAC: account1.account1No
        };
        await loanApplication.applyForALoan(loanApplicationDetails);
        let loanVerificationDetails = {
            loanProvider: "Wealth Securities Dynamic Loans (WSDL)",
            loanApprovalDate: "02-17-2023",
            loanApplicationStatus: "Approved",
            responseText: "Congratulations, your loan has been approved.",
            downPayment: "20",
            downPaymentAccountNo: account1.account1No,
            beforeDownPaymentACBalance: account1Balance
        }
        await loanApplication.verifyLoanApprovedAndGetNewLoanAccount(loanVerificationDetails);


        await homePage.logOut();
    });
});