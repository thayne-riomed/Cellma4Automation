class Menu{
    constructor(page)
    {
        this.page=page
        this.menubtn=page.getByTestId('Menu')
        this.linkaddReferral=page.getByText('Add Referral')
        this.linkfindpatient=page.getByText('Find Patient')
        //this.menulogoutbtn=page.getByText('Logout')
        this.logoutButton=page.locator("xpath=//button[@data-testid='logout']")

        
    }
    async clickOnFindPatientlink()
    {
        await this.linkfindpatient.click()
    }
    async clickOnAddReferrallink()
    {
        await this.linkaddReferral.click()
    }
    async clickOnMenubtn()
    {
        await this.menubtn.click()
    }
    async clickOnLogout()
    {
        await this.logoutButton.click()
    }
}
module.exports=Menu