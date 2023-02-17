const Selector = require("../Selectors/Selectors");
class RegisterPage{
    async accountRegistration(userDetails){
        await page.waitForSelector(Selector.inputField("id='customer.firstName'"));
        await page.type(Selector.inputField("id='customer.firstName'"), userDetails.firstName);
        await page.type(Selector.inputField("id='customer.lastName'"), userDetails.lastName);
        await page.type(Selector.inputField("id='customer.address.street'"), userDetails.street);
        await page.type(Selector.inputField("id='customer.address.city'"), userDetails.city);
        await page.type(Selector.inputField("id='customer.address.state'"), userDetails.state);
        await page.type(Selector.inputField("id='customer.address.zipCode'"), userDetails.pincode);
        await page.type(Selector.inputField("id='customer.phoneNumber'"), userDetails.phoneNo);
        await page.type(Selector.inputField("id='customer.ssn'"), userDetails.ssn);
        await page.type(Selector.inputField("id='customer.username'"), userDetails.userName);
        await page.type(Selector.inputField("id='customer.password'"), userDetails.password);
        await page.type(Selector.confirmPassword, userDetails.password);
        let registerBtn = await page.waitForSelector(Selector.submitBtn('Register'));
        await registerBtn.click();
    }

    async verifyUserRegistered(userDetails, result){
        await page.waitForSelector(Selector.welcomeMsg, {visible: true});
        await expect(await page.$eval(Selector.welcomeMsg, ele => ele.innerText)).toBe("Welcome "+userDetails.userName);
        await expect(await page.$eval(Selector.responseText, ele => ele.innerText)).toBe(result);
        await page.waitForSelector(Selector.logedInText, {visible: true});
        await expect(await page.$eval(Selector.logedInText, ele => ele.innerText)).toBe("Welcome "+userDetails.firstName+" "+userDetails.lastName);
    }
}
module.exports = RegisterPage;