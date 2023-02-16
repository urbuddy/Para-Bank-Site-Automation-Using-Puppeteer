const Selector = require("../Selectors/Selectors");
class UpdateProfilePage{
    async updateProfileDetails(newDetails){
        await page.waitForNetworkIdle({idleTime: 100});
        await page.waitForSelector(Selector.inputField("id='customer.firstName'"));
        await page.type(Selector.inputField("id='customer.firstName'"), newDetails.firstName);
        await page.type(Selector.inputField("id='customer.lastName'"), newDetails.lastName);
        await page.type(Selector.inputField("id='customer.address.street'"), newDetails.street);
        await page.type(Selector.inputField("id='customer.address.city'"), newDetails.city);
        await page.type(Selector.inputField("id='customer.address.state'"), newDetails.state);
        await page.type(Selector.inputField("id='customer.address.zipCode'"), newDetails.pincode);
        await page.type(Selector.inputField("id='customer.phoneNumber'"), newDetails.phoneNo);
        let updateProfileBtn = await page.waitForSelector(Selector.submitBtn('Update Profile'), {visible: true});
        await updateProfileBtn.click();
    }

    async verifyProfileUpdated(result){
        await page.waitForXPath(Selector.headingText('Profile Updated'), {visible: true});
        let res = await page.evaluate(element => {
            return element.textContent;
        }, (await page.$x(Selector.paraAfterHeading('Profile Updated')))[0]);
        expect(res).toBe(result);
    }
}
module.exports = UpdateProfilePage;