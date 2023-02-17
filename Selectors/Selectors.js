module.exports = {
    homePageURL: "https://parabank.parasoft.com/parabank/index.htm",
    
    submitBtn: function(value) {
        return "input[value='"+value+"']";
    },
    logedInText: ".smallText",
    openLink: function(value) {
        return "//a[normalize-space()='"+value+"']";
    },
    inputField: function(value) {
        return "input["+value+"]";
    },
    confirmPassword: "#repeatedPassword",
    welcomeMsg: "div[id='rightPanel'] h1",
    responseText: "div[id='rightPanel'] p",
    firstACNoSelector: "tr[ng-repeat='account in accounts'] td:nth-child(1) a",
    accountNoSelector: function(accountNo) {
        return "//a[normalize-space()='"+accountNo+"']";
    },
    accountBalance: function(accountNo){
        return "//a[normalize-space()='"+accountNo+"']/parent::td/following::td[2]";
    },
    accountType: "#type",
    optionValue: function(value) {
        return "option[value='"+value+"']";
    },
    fromAccountId:"#fromAccountId",
    headingText: function(value) {
        return "//h1[normalize-space()='"+value+"']";
    },
    paraAfterHeading: function(value) {
        return "//h1[normalize-space()='"+value+"']/following::p";
    },
    newAccountId: "#newAccountId",
    amount: "#amount",
    toAccountId: "#toAccountId",
    select: "select[name='fromAccountId']",
    payeeName: "#payeeName",
    downPayment: "#downPayment",
    loanProvider: "#loanProviderName",
    responceDate: "#responseDate",
    loanStatus: "#loanStatus"
}