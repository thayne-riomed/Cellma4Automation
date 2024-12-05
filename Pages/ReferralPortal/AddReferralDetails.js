class AddReferralDetails
{
    constructor(page)
    {
        this.page=page

        //Customisable Add Referral details
       this.btnSetting=page.getByTestId('Setting Button')
       this.btnCustomizableView=page.getByRole('menuitem', { name: 'Customizable View' })

       //Add Referral Details Patient Search Section.
       this.txtboxMPINumber=page.getByTestId('MPI Number')
       this.txtboxBarcode=page.getByTestId('Barcode')
       this.txtboxCard=page.getByTestId('Card')
       this.txtboxNHSNumber=page.getByTestId('NHS No')
       this.txtboxHospRef=page.getByTestId('Hospital Ref')
       this.txtboxGivenName=page.getByTestId('Given Name')
       this.txtboxFamilyName=page.getByTestId('Family Name')
       this.dropdownSex=page.getByTestId('sex').getByLabel('Open')
       this.txtBornDate=page.getByPlaceholder('DD/MM/YYYY')
       this.txtMobile=page.getByTestId('Mobile')
       this.txtPostCode=page.getByTestId('Postcode')
       this.txtMRNNumber=page.getByTestId('MRN Number')
       this.txtIdentificationID=page.getByTestId('Identification Id')
       this.txtPatientInOtherName=page.getByTestId('Patient name in other language')
       this.dropdownPatientSeenInLastDays=page.getByTestId('patientSeenInLastDays').getByLabel('Open')
       this.checkboxIncludeDeceasedPatients=page.getByRole('checkbox', { name: 'Include deceased patients' })
       this.checkboxIncludeServicePatient=page.getByRole('checkbox', { name: 'Include service patients' })
       this.checkboxSoundex=page.getByRole('checkbox', { name: 'Soundex' })
       this.btnSearch=page.getByTestId('Search')
       this.btnPatientSearch=page.getByRole('button', { name: 'Search' })
       this.btnAddPatient=page.getByTestId('Add Patient')
       this.btnReferPatient=page.getByTestId('Refer Patient')
       this.selectPatient=page.getByTestId('Select')


       //Add Referral Details
       this.btnpatientDetailsAccordion=page.getByTestId('patientDetailsAccordion')      
       this.txtboxIdentifier=page.getByTestId('Identifier')
       this.dropdownTitle=page.getByTestId('title').getByLabel('Open')
       this.txtboxGivenName=page.getByTestId('Given Name')
       this.btnCreatePatient=page.getByTestId('Create Patient')

       //Service Referral Tab
       this.btnserviceReferralAccordion=page.getByTestId('referralServiceDetailsAccordion')
       this.dropdownestiblishment=page.getByTestId('establishment').getByLabel('Open')
       this.dropdownService=page.getByTestId('service').getByLabel('Open')
       this.dropdownClinicType=page.getByTestId('clinicType').getByLabel('Open')
       this.dropdownClinicLocation=page.getByTestId('clinicLocation').getByLabel('Open')
       this.txtboxDateOfReferral=page.getByLabel('Date of Referral *')
       this.txtboxTimeOfReferral=page.getByPlaceholder('hh:mm')
       this.dropdownConsultant=page.getByTestId('consultant').getByLabel('Open')
       this.dropdownClinicalPriority=page.getByTestId('clinicalPriority').getByLabel('Open')
       this.dropdownReferralType=page.getByTestId('referralType').getByLabel('Open')
       this.dropdownReferralReason=page.getByTestId('referralReason').getByLabel('Open')
       this.txtboxReferralNotes=page.getByTestId('Referral Notes')


       //ReferralDocument Tab
       this.btnreferralDocumentAccordion=page.getByTestId('referralDocumentsAccordion')         
       
       //Track Referral
       this.btnTrackReferral=page.getByTestId('CommonCellmaPopup').getByTestId('Track Referral')
    }

    //Track Referral
    async clickOnTrackReferralButton()
    {
        await this.btnTrackReferral.click()
    }
    async clickOnReferPatientButton()
    {
        await this.btnReferPatient.click()
    }

    //ReferralDocument Tab
    async clickOnReferralDocumentTab()
    {
        await this.btnreferralDocumentAccordion.click()
    }
    //Service Referral Tab
    async enterReferralNotes(refNotes)
    {
        await this.txtboxReferralNotes.type(refNotes)
    }
    async selectReferralReason(refReason)
    {
        await this.dropdownReferralReason.click()
        await this.page.getByRole('option', { name: refReason }).click()
    }
    async selectReferralType(refType)
    {
        await this.dropdownReferralType.click()
        await this.page.getByRole('option', { name: refType, exact: true }).click()
    }
    async selectPriority(priority)
    {
        await this.dropdownClinicalPriority.click()
        await this.page.getByRole('option', { name: priority }).click()
    }
    async selectConsultant(consultant)
    {
        await this.dropdownConsultant.click()
        await this.page.getByRole('option', { name: consultant, exact: true }).click()
    }
    async enterTimeOfReferral(refTime)
    {
        await this.txtboxTimeOfReferral.type(refTime)
    }
    async enterDateOfReferral(refDate)
    {
        await this.txtboxDateOfReferral.type(refDate)
    }
    async selectClinicLocation()
    {
        await this.dropdownClinicLocation.click()
        await this.page.locator('#referralServiceClinicLocation-option-0').click()
    }

    async selectClinicType(cliType)
    {
        await this.dropdownClinicType.click()
        await this.page.getByRole('option', { name: cliType }).click()
    }
    async selectService(service)
    {
        await this.dropdownService.click()
        await this.page.getByRole('option', { name: service }).click()
    }
    async clickOnServiceReferralAccordion()
    {
        await this.btnserviceReferralAccordion.click()
    }
    async selectEstablishment(establishment)
    {
        await this.dropdownestiblishment.click()
        await this.page.getByRole('option', { name: establishment }).click()

    }
    //Add Referrals Details
    async clickOnCreatePatientButton()
    {
        await this.btnCreatePatient.click()
    }
    async enterIdentifer(Identifier)
    {
        await this.txtboxIdentifier.type(Identifier)
    }
    async clickOnPatientDetailsAccordion()
    {
        await this.btnpatientDetailsAccordion.click()
    }
    

    async selectTitle(pat_title)
    {
        await this.dropdownTitle.click()
        await this.page.getByRole('option', { name: pat_title, exact: true }).click()
    }

    //Add Referral Details Patient Search Section.
    async clickOnAddPatientButton()
    {
        await this.btnAddPatient.click()
    }
    async enterGivenName(GivenName)
    {
        await this.txtboxGivenName.type(GivenName)
    }
    async enterFamilyName(FamilyName)
    {
        await this.txtboxFamilyName.type(FamilyName)
    }
    async selectSex(Sex)
    {
        await this.dropdownSex.click()
        await this.page.getByRole('option', { name: Sex, exact: true }).click()
    }
    async enterBornDate(BornDate)
    {
        await this.txtBornDate.fill(BornDate)
    }
    async enterHosptialRefNumber(hosptialRef)
    {
        await this.txtboxHospRef.type(hosptialRef)
    }

    async clickOnSearchButton()
    {
        await this.btnSearch.click()
    }
    async clickOnPatientSearchButton()
    {
        await this.btnPatientSearch.click()
    }
    async enterMPINumber(MPINumber)
    {
        await this.txtboxMPINumber.fill(MPINumber)
    }
    async clearMPINumber()
    {
        await this.txtboxMPINumber.fill('')
    }
    async enterBarcode(Barcode)
    {
        await this.txtboxBarcode.type(Barcode)
    }
    async clearBarcode()
    {
        await this.txtboxBarcode.fill('')
    }
    async clickOnPatientSelect()
    {
        await this.selectPatient.click()
    }


    //Customisable Add Referral details
    async clickOnSettingButton()
    {
        await this.btnSetting.click()
    }
    async clickOnCustomizableViewButton()
    {
        await this.btnCustomizableView.click()
    }

}
module.exports=AddReferralDetails