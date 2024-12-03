class Homepage{
    constructor(page)
    {
        this.page=page
        this.iconPatient=page.getByTestId('Patients').nth(1)
        this.iconHomePage=page.locator("xpath=//img[@alt='homeDashboard']")
        this.iconAppointment=page.getByTestId('Appointments').nth(1)
        
        this.iconReferral=page.getByRole('heading', { name: 'Referrals' })
        this.iconMDT=page.getByRole('heading', { name: 'MDT' })
        this.iconUser=page.getByRole('heading', { name: 'Users' })
        this.iconAdmin=page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-container css-1d3bbye']//div[@aria-label='Admin']")
        
        //SideIcon
        this.homeDashboard=page.locator("xpath=//img[@alt='homeDashboard']")
        this.homeicon=page.locator("xpath=//img[@alt='homeDashboard']")
        this.sideIconTask=page.getByTestId('tasks')
        this.sideIconAlerts=page.getByTestId('alerts')
        this.sideIconMessages=page.getByTestId('messages')
        this.sideIconAppointment=page.locator("xpath=//div[@data-testid='appointments']")
        this.sideIconLetters=page.getByTestId('letters')
        this.sideIconReferrals=page.getByTestId('referrals')
        this.sideIconRejectedReferral=page.getByTestId('ourRejectedReferrals')
        this.sideiconourPendingOnReferral=page.getByTestId('ourPendingOnReferral')

        //Menu
        this.btnMenu=page.getByTestId('Menu')
        this.MenuDDFindPatient=page.getByText('Find Patient')
        this.MenuDDMyDetails=page.getByTestId('menuDropDownMyDetails')
        this.MenuDDMyTask=page.getByText('My Tasks')
        this.MenuDDMyAlerts=page.getByTestId('menuDropDownMyAlerts')
        this.MenuDDMyTemplates=page.getByText('My Templates')   
        this.MenuDDMyPhysicalSigns=page.getByText('My Physical Signs')   
        this.MenuDDMyAppointments=page.getByText('My Appointments')  
        this.MenuDDCellmaUserVersion=page.getByText('Cellma User Version')
        this.CloseCellmaVersionPopup=page.getByTestId('CancelIcon')
        this.MenuDDLogout=page.getByText('Logout')
    }

    //Click On Side Icons on Home page.

    async clickOnHomeDashboardIcon()
    {
       await this.homeDashboard.click()
    }
    async clickOnSidebarAppointmentIcon()
    {
        await this.sideIconAppointment.click()
    }
    async closeCellmaVersionPopup()
    {
        await this.CloseCellmaVersionPopup.click()
    }
    async clickOnMenuDDLogout()
    {
        await this.MenuDDLogout.click()
    }
    async clickOnMenuDDCellmaUserVersion()
    {
        await this.MenuDDCellmaUserVersion.click()
    }
    async clickOnMenuDDMyAppointments()
    {
        await this.MenuDDMyAppointments.click()
    }
    async clickOnMenuDDMyPhysicalSigns()
    {
        await this.MenuDDMyPhysicalSigns.click()
    }
    async clickOnMenuDDMyTemplates()
    {
        await this.MenuDDMyTemplates.click()
    }
    async clickOnMenuDDMyAlerts()
    {
        await this.MenuDDMyAlerts.click()
    }
    async clickOnMenuDDMyTask()
    {
        await this.MenuDDMyTask.click()
    }
    async clickOnMenuDDMyDetails()
    {
        await this.MenuDDMyDetails.click()
    }

    async clickOnMenuFindPatientLink()
    {
        await this.MenuDDFindPatient.click()
    }

    async clickOnMenu()
    {
        await this.btnMenu.click()
    }

    async clickOnSideIconRejectedReferrals()
    {
       await this.sideIconRejectedReferral.click()
    }
    async clickOnOurPendingonReferrals()
    {
        await this.sideiconourPendingOnReferral.click()
    }
    async clickOnSideIconReferrals()
    {
       await this.sideIconReferrals.click()
    }

    async clickOnSideIconLetters()
    {
       await this.sideIconLetters.click()
    }
    async clickOnSideIconMessage()
    {
       await this.sideIconMessages.click()
    }
    async clickonSidebarHomeIcon()
    {
        await this.homeicon.click()
    }
    async clickOnSideIconAlerts()
    {
       await this.sideIconAlerts.click()
     }
     async clickOnSideIconTask()
     {
        await this.sideIconTask.click()
     }
     async clickOnUserIcon()
    {
        await this.iconUser.click()
    }
    async clickOnPatientIcon()
    {
        await this.iconPatient.click()
    }
    async clickOnHomePageIcon()
    {
        await this.iconHomePage.click()
    }
    async clickOnAppointmentIcon()
    {
        await this.iconAppointment.click()
    }
    async clickOnAdminIcon()
    {
        await this.iconAdmin.click()
    }
    async clickOnReferralIcon()
    {
        await this.iconReferral.click()
    }
    async clickOnMDTIcon()
    {
        await this.iconMDT.click()
    }
    
}
module.exports=Homepage