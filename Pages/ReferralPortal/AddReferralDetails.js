const { notStrictEqual } = require("assert")
const { add } = require("winston")

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
       this.txtboxDateOfReferral=page.getByTestId('Date of Referral').getByPlaceholder('dd/mm/yyyy')
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

       //Add Additional Information
       this.btnAdd=page.getByTestId('Add')
       this.btnSave=page.getByTestId('Save')
       this.dropdownSubCategory=page.getByTestId('subCategory').getByLabel('Open')
       this.checkboxPrivateRecord=page.getByRole('checkbox', { name: 'Private Record' })
       this.checkboxSetAsDefault=page.getByRole('checkbox', { name: 'Set as Default' })
       this.checkboxAddToFavourites=page.getByRole('checkbox', { name: 'Add to Favourites' })
       this.txtboxNotes=page.getByTestId('CommonCellmaPopup').getByTestId('Notes')
       this.dropdownType=page.getByTestId('type').getByLabel('Open')
       this.dropdownSite=page.getByTestId('site').getByLabel('Open')
       this.btnClosePopup=page.getByRole('button', { name: 'cancelIcon' })

       //Clinical Summary
       this.expandClinicalSummary=page.getByRole('button', { name: 'Clinical Summary' })
       this.searchConditions=page.getByLabel('Conditions', { exact: true })
       this.txtDateOfDiagnosis=page.getByTestId('Date Of Diagnosis').getByPlaceholder('dd/mm/yyyy')
       this.dropdownPreviousCondition=page.getByTestId('previousCondition').getByLabel('Open')       

       //Medications
       this.expandMedications=page.getByRole('button', { name: 'Medications' })
       this.searchMedications=page.getByLabel('Medications')
       this.txtHeight=page.getByTestId('Height (In cms)')
       this.txtDose=page.getByTestId('Dose')
       this.dropdownFrequency=page.getByTestId('frequency').getByLabel('Open')
       this.dropdownRoute=page.getByTestId('route').getByLabel('Open')
       this.txtDays=page.getByTestId('Days')
       this.dropdownPrescribedBy=page.getByTestId('prescribedBy').getByLabel('Open')
       this.txtMethod=page.getByTestId('Method')
       this.linkVariableDose=page.getByTestId('Variable dose regime')
       //Variable Dose Popup
       this.txtVariableDose=page.getByRole('textbox', { name: 'medicationVariableForm[0].dose' })
       this.dropdownVariableFrequency=page.getByTestId('variableDoseRegime[0].frequency').getByLabel('Open')
       this.dropdownVariableRoute=page.getByTestId('variableDoseRegime[0].route').getByLabel('Open')
       this.txtVariableDuration=page.getByRole('textbox', { name: 'variableDoseRegime[0].duration' })
       this.txtVariabelNumberToDispense=page.getByTestId('Number to dispense')
       this.btnSaveVariableDose=page.getByLabel('saveCreatedVariableDoseRegime')
       this.btnCloseVariableDose=page.getByRole('button', { name: 'cancelIcon' })
       //////
       this.txtStartDate=page.getByTestId('Start Date').getByPlaceholder('dd/mm/yyyy')
       this.txtReviewDate=page.getByTestId('Review Date').getByPlaceholder('dd/mm/yyyy')
       this.txtStopDate=page.getByTestId('Stop Date').getByPlaceholder('dd/mm/yyyy')
       this.dropdownSideEffect=page.getByTestId('sideEffect').getByLabel('Open')
       this.dropdownStatus=page.getByTestId('status').getByLabel('Open')
       this.dropdownIndication=page.getByTestId('indication').getByLabel('Open')
       this.dropdownStoppedReason=page.getByTestId('stoppedReason').getByLabel('Open')
       this.dropdownPGDPSD=page.getByTestId('pGDPSD').getByLabel('Open')
       this.dropdownUserGrades=page.getByTestId('userGradesThatCanAdministatorMedicationMAED').getByLabel('Open')
       this.dropdownMaxRefills=page.getByTestId('maxReffills').getByLabel('Open')
       this.txtQuantity=page.getByTestId('Quantity')
       this.txtUnit=page.getByTestId('Unit')
       this.dropdownCurrentLocation=page.getByTestId('currentLocation').getByLabel('Open')
       this.txtLinkToDiagnosis=page.getByTestId('linkToDiagnosis').getByLabel('Link to Diagnosis')
       this.dropdownAdherent=page.getByTestId('adherent').getByLabel('Open')
       this.checkboxPrescriptionAndSupply=page.getByRole('checkbox', { name: 'Prescription and supply' })
       this.checkboxSupply=page.getByRole('checkbox', { name: 'Supply', exact: true })
       this.checkboxSuitableForHomeDelivery=page.getByRole('checkbox', { name: 'Suitable for Home Delivery' })
       this.checkboxAddToPrescription=page.getByRole('checkbox', { name: 'Add to Prescription' })
       this.dropdownEndoserment=page.getByTestId('endoserment').getByLabel('Open')
       this.txtForCondition=page.getByTestId('forCondition').getByLabel('For Condition')
       this.txtPriceCheckQuantity=page.getByTestId('Price check quantity')
       this.txtTotalPrice=page.getByTestId('Total Cost')

       //Investigations
       this.expandInvestigations=page.getByRole('button', { name: 'Investigations' })
       this.searchInvestigations=page.getByLabel('Investigations')
       this.dropdownOutstandingInvestigations=page.getByTestId('outstandingInvestigations').getByLabel('Open')
       this.dropdownReason=page.getByTestId('reason').getByLabel('Open')
       this.txtResults=page.getByTestId('Results')
       this.dropdownOutcome=page.getByTestId('outcome').getByLabel('Open')
       this.dropdownCritical=page.getByTestId('critical').getByLabel('Open')
       this.txtDateOfUpload=page.getByTestId('Date of Upload').getByPlaceholder('dd/mm/yyyy')
       this.dropdownPatientCurrentLocation=page.getByTestId('patientCurrentLocation').getByLabel('Open')
       this.txtCompletedDate=page.getByTestId('Completed Date').getByPlaceholder('dd/mm/yyyy')
       this.dropdownPriority=page.getByTestId('priority').getByLabel('Open')
       this.txtRequestedBy=page.getByTestId('requestedBy').getByLabel('Requested By')
       this.dropdownSendTo=page.getByTestId('sendTo').getByLabel('Open')
       this.dropdownExternalLocation=page.getByTestId('externalLocation').getByLabel('Open')
       this.checkboxForImagingRequest=page.getByRole('checkbox', { name: 'For Imaging Request' })
       this.checkboxForLabRequest=page.getByRole('checkbox', { name: 'For Lab Request' })
       this.checkboxShareOnPortal=page.getByRole('checkbox', { name: 'Share on Portal' })
       this.checkboxAddToAlert=page.getByRole('checkbox', { name: 'Add to Alert' })

       //Patient Scans
       this.expandPatientScans=page.getByRole('button', { name: 'Patient Scans' })
       this.searchPatientScans=page.getByLabel('Patient Scans')
       this.txtCategory=page.getByTestId('category').getByPlaceholder('Category')
       this.txtScanDate=page.getByTestId('Scan Date').getByPlaceholder('dd/mm/yyyy')
       this.dropdownScanArea=page.getByTestId('scanArea').getByLabel('Open')
       this.txtBMDScore=page.getByTestId('BMD Score')
       this.txtTScore=page.getByTestId('T Score')
       this.txtZScore=page.getByTestId('Z Score')
       this.dropdownMachineName=page.getByTestId('machineName').getByLabel('Open')
       this.btnChooseFile=page.getByTestId('Choose File')

       //Procedures
       this.expandProcedures=page.getByRole('button', { name: 'Procedures' })
       this.searchProcedures=page.getByLabel('Procedures', { exact: true })
       this.txtDateOfProcedure=page.getByTestId('Date Of Procedure').getByPlaceholder('dd/mm/yyyy')
       this.txtAge=page.getByTestId('Age')
       this.txtPerformedByHPConsultants=page.getByTestId('performedByHPConsultants').getByLabel('Performed By HP/Consultants')
       this.dropdownLevel=page.getByTestId('level').getByLabel('Open')
       this.dropdownLinkToClinicLocation=page.getByTestId('linkToClinicLocation').getByLabel('Open')
       this.txtLinkToClinicDiagnosis=page.getByTestId('linkToClinicDiagnosis').getByLabel('Link To Clinic Diagnosis')
       this.dropdownLinkToWorklist=page.getByTestId('linkToWorklist').getByLabel('Open')
       this.txtLinkToExistingCondition=page.getByTestId('linkToExistingCondition').getByLabel('Link To Existing Condition')
       this.txtCompletionDate=page.getByTestId('Completion Date').getByPlaceholder('dd/mm/yyyy')
       this.checkboxDeviceRequired=page.getByRole('checkbox', { name: 'Device Required' })
       
       //Referral Documents
       this.expandReferralDocuments=page.getByRole('button', { name: 'Referral Documents' })
       this.dropdownDocumentCategory=page.getByTestId('referralLetter[0].documentCategory').getByLabel('Open')
       this.btnChooseFileRefDoc=page.getByTestId('Choose File1')
       this.txtRefDocNotes=page.getByTestId('Notes')
       this.btnAddAdditionalDocuments=page.getByTestId('Add Additional Documents')

       //Additional Referral Iformation
       this.expandAdditionalInformationOfTheReferral=page.getByRole('button', { name: 'Additional Information of The' })
       this.txtAdditionalInformation=page.getByTestId('Additional Information')
    }

    async clickOnAddButton()
    {
        await this.btnAdd.click()
    }
    async clickOnSaveButton()
    {
        await this.btnSave.click()
    }
    async selectSubCategory(category)
    {
        await this.dropdownSubCategory.click()
        await this.page.getByRole('option', { name: category, exact: true }).click()
    }
    async clickOnClosePopup()
    {
        await this.btnClosePopup.click()
    }
    async selectStatus(status)
    {
        await this.dropdownStatus.click()
        await this.page.getByRole('option', { name: status, exact: true }).click()
    }

    //Clinical Summary
    async clickOnClinicalSummarySection()
    {
        await this.expandClinicalSummary.click()
    }
    async selectCondition(condition)
    {
        await this.searchConditions.type(condition)
        await this.page.getByRole('option', { name: condition, exact: true }).click()
    }    
    async enterDateOfDiagnosis(date)
    {
        await this.txtDateOfDiagnosis.type(date)
    }

    async selectPreviousCondition(cond)
    {
        let answer;
        if(cond === 1){
            answer = 'Yes'
        }
        else answer = 'No'
        
        await this.dropdownPreviousCondition.click()
        await this.page.getByRole('option', { name: answer }).click()
    }

    async selectCheckboxPrivateRecord()
    {
        await this.checkboxPrivateRecord.click()
    }

    async selectCheckboxSetAsDefault()
    {
        await this.checkboxSetAsDefault.click()
    }

    async selectCheckboxAddToFavourites()
    {
        await this.checkboxAddToFavourites.click()
    }

    async enterNotes(notes)
    {
        await this.txtboxNotes.type(notes)
    }

    //Medications
    async clickOnMedicationsSection()
    {
        await this.expandMedications.click()
    }
    async selectMedication(medication)
    {
        await this.searchMedications.type(medication)
        await this.page.getByRole('option', { name: medication, exact: true }).click()
    }
    async enterHeight(height)
    {
        await this.txtHeight.type(height)
    }
    async enterDose(dose)
    {
        await this.txtDose.type(dose)
    }
    async selectFrequency(frequency)
    {
        await this.dropdownFrequency.click()
        await this.page.getByRole('option', { name: frequency, exact: true }).click()
    }
    async selectRoute(route)
    {
        await this.dropdownRoute.click()
        await this.page.getByRole('option', { name: route, exact: true }).click()
    }
    async enterDays(days)
    {
        await this.txtDays.type(days)
    }
    async selectSite(site)
    {
        await this.dropdownSite.click()
        await this.page.getByRole('option', { name: site, exact: true }).click()
    }
    async selectPrescribedBy(prescribedBy)
    {
        await this.dropdownPrescribedBy.click()
        await this.page.getByRole('option', { name: prescribedBy, exact: true }).click()
    }
    async enterMethod(method)
    {
        await this.txtMethod.fill(method)
    }
    async clickOnVariableDoseLink()
    {
        await this.linkVariableDose.click()
    }
    //Variable Dose Popup
    async enterVariableDose(dose){
        await this.txtVariableDose.type(dose)
    }
    async selectVariableFrequency(frequency){
        await this.dropdownVariableFrequency.click()
        await this.page.getByRole('option', { name: frequency }).click()
    }
    async selectVariableRoute(route){
        await this.dropdownVariableRoute.click()
        await this.page.getByRole('option', { name: route }).click()
    }
    async enterVariableDuration(duration){
        await this.txtVariableDuration.type(duration)
    }
    async enterVariableNumberToDispense(numToDis){
        await this.txtVariabelNumberToDispense.type(numToDis)
    }
    async clickOnSaveVariableDose(){
        await this.btnSaveVariableDose.click()
    }
    async clickOnCloseVariableDose(){
        await this.btnCloseVariableDose.click()
    }
    ///End
    async enterStartDate(date)
    {
        await this.txtStartDate.type(date)
    }
    async enterReviewDate(date)
    {
        await this.txtReviewDate.type(date)
    }
    async enterStopDate(date)
    {
        await this.txtStopDate.type(date)
    }
    async selectSideEffect(sideEffect)
    {
        await this.dropdownSideEffect.click()
        await this.page.getByRole('option', { name: sideEffect, exact: true }).click()
    }
    async selectIndication(indication)
    {
        await this.dropdownIndication.click()
        await this.page.getByRole('option', { name: indication, exact: true }).click()
    }
    async selectStoppedReason(stoppedReason)
    {
        await this.dropdownStoppedReason.click()
        await this.page.getByRole('option', { name: stoppedReason, exact: true }).click()
    }
    async selectPGDPSD(psd)
    {
        await this.dropdownPGDPSD.click()
        await this.page.getByRole('option', { name: psd })
    }
    async selectUserGrades(role)
    {
        await this.dropdownUserGrades.click()
        await this.page.getByRole('option', { name: role }).click()
    }
    async selectMaxRefills(refill)
    {
        await this.dropdownMaxRefills.click()
        await this.page.getByRole('option', { name: 'Not set', exact: true }).click()
        await this.dropdownMaxRefills.click()
        await this.page.getByRole('option', { name: refill, exact: true }).click()
    }
    async enterQuantity(quantity)
    {
        await this.txtQuantity.type(quantity)
    }
    async enterUnit(unit)
    {
        await this.txtUnit.type(unit)
    }
    async selectCurrentLocation(location)
    {
        await this.dropdownCurrentLocation.click()
        await this.page.getByRole('option', { name: location }).click()
    }
    async enterLinkToDiagnosis(diagnosis)
    {
        await this.txtLinkToDiagnosis.type(diagnosis)
    }
    async selectAdherent(adherent)
    {
        await this.dropdownAdherent.click()
        await this.page.getByRole('option', { name: adherent })
    }
    async selectCheckboxPrescriptionAndSupply()
    {
        await this.checkboxPrescriptionAndSupply.click()
    }
    async selectCheckboxSupply()
    {
        await this.checkboxSupply.click()
    }
    async selectCheckboxSuitableForHomeDelivery()
    {
        await this.checkboxSuitableForHomeDelivery.click()
    }
    async selectCheckboxAddToPrescription()
    {
        await this.checkboxAddToPrescription.click()
    }
    async selectEndoserment(value)
    {
        await this.dropdownEndoserment.click()
        await this.getByRole('option', { name: value, exact: true }).click()
    }
    async enterForCondition(condition)
    {
        await this.txtForCondition.type(condition)
        //page.getByRole('option', { name: 'Hypertension' }).click();
    }
    async enterPriceCheckQuantity()
    {
        await this.txtPriceCheckQuantity.fill('')
        await this.txtPriceCheckQuantity.type('10')
    }
    async enterTotalPrice(totalPrice)
    {
        await this.txtTotalPrice.type(totalPrice)
    }

    //Investigations
    async clickOnInvestigationsSection()
    {
        await this.expandInvestigations.click()
    }
    async selectInvestigation(investigation)
    {
        await this.searchInvestigations.type(investigation)
        await this.page.getByRole('option', { name: investigation, exact: true }).click()
    }
    async selectOutstandingInvestigation()
    {
        await this.dropdownOutstandingInvestigations.click()
        //No choice currently in list.
    }
    async selectReason(reason)
    {
        await this.dropdownReason.click()
        await this.page.getByRole('option', { name: reason }).click()
    }
    async enterResults(result){
        await this.txtResults.type(result)
    }
    async selectOutcome(outcome){
        await this.dropdownOutcome.click()
        await this.page.getByRole('option', { name: outcome }).click()
    }
    async selectCritical(critical){
        await this.dropdownCritical.click()
        await this.page.getByRole('option', { name: critical, exact: true }).click()
    }
    async enterLinkToDiagnosis(diagnosis){
        await this.txtLinkToDiagnosis.type(diagnosis)
    }
    async enterDateOfUpload(date){
        await this.txtDateOfUpload.type(date)
    }
    async selectPatientCurrentLocation(location){
        await this.dropdownPatientCurrentLocation.click()
        await this.page.getByRole('option', { name: location }).click()
    }
    async enterCompletedDate(date){
        await this.txtCompletedDate.type(date)
    }
    async selectPriority(priority){
        await this.dropdownPriority.click()
        await this.page.getByRole('option', { name: priority }).click()
    }
    async enterRequestedBy(requester){
        await this.txtRequestedBy.type(requester)
    }
    async selectSendTo(){
        await  this.dropdownSendTo.click()
        //No options currently
    }
    async selectExternalLocation(location){
        await this.dropdownExternalLocation.click()
        await this.page.getByRole('option', { name: location, exact: true })
    }
    async selectCheckboxForImagingRequest(){
        await this.checkboxForImagingRequest.click()
    }
    async selectCheckboxForLabRequest(){
        await this.checkboxForLabRequest.click()
    }
    async selectCheckboxShareOnPortal(){
        await this.checkboxShareOnPortal.click()
    }
    async selectCheckboxAddToAlert(){
        await this.checkboxAddToAlert.click()
    }

    //Patient Scans
    async clickOnPatientScansSection(){
        await this.expandPatientScans.click()
    }
    async selectPatientScan(scan){
        await this.searchPatientScans.type(scan)
        await this.page.getByRole('option', { name: scan }).click()
    }
    async selectCategory(){
        await this.txtCategory.click()
        await this.page.getByRole('option', { name: 'Patient\'s Scans' }).click()
    }
    async selectType(type){
        await this.dropdownType.click()
        await this.page.getByRole('option', { name: type, exact: true }).click()
    }
    async enterScanDate(date){
        await this.txtScanDate.type(date)
    }
    async selectScanArea(scanArea){
        await this.dropdownScanArea.click()
        await this.page.getByRole('option', { name: scanArea }).click()
    }
    async enterBMDScore(score){
        await this.txtBMDScore.type(score)
    }
    async enterTScore(score){
        await this.txtTScore.type(score)
    }
    async enterZScore(score){
        await this.txtZScore.type(score)
    }
    async selectMachineName(machineName){
        await this.dropdownMachineName.click()
        await this.page.getByRole('option', { name: machineName }).click()
    }

    //Procedures
    async clickOnProceduresSection(){
        await this.expandProcedures.click()
    }
    async selectProcedure(procedure){
        await this.searchProcedures.type(procedure)
        await this.page.getByRole('option', { name: procedure }).click()
    }
    async enterDateOfProcedure(date){
        await this.txtDateOfProcedure.type(date)
    }
    async enterPerformedByHpConsultants(consultant){
        await  this.txtPerformedByHPConsultants.type(consultant)
    }
    async selectLevel(level){
        await  this.dropdownLevel.click()
        await  this.page.getByRole('option', { name: level }).click()
    }
    async selectLinkToClinicLocation(location){
        await  this.dropdownLinkToClinicLocation.click()
        await  this.page.getByRole('option', { name: location }).click()
    }
    async enterLinkToClinicDiagnosis(diagnosis){
        await  this.txtLinkToClinicDiagnosis.type(diagnosis)
    }
    async selectLinkToWorklist(worklist){
        await  this.dropdownLinkToWorklist.click()
        //No options.
    }
    async enterLinkToExistingCondition(condition){
        await  this.txtLinkToExistingCondition.click()
        await  this.page.getByRole('option', { name: condition }).click()
    }
    async enterCompletionDate(date){
        await   this.txtCompletionDate.type(date)
    }
    async selectCheckboxDeviceRequired(){
        await  this.checkboxDeviceRequired.click()
    }

    //Referral Documents
    async clickOnReferralDocumentsSection()
    {
        await this.expandReferralDocuments.click()
    }
    async selectDocumentCategory(category)
    {
        await this.dropdownDocumentCategory.click()
        await this.page.getByRole('option', { name: category }).click()
    }
    async enterRefDocNotes(notes)
    {
        await this.txtRefDocNotes.fill(notes)
    }
    async clickOnAddAdditionalDocuments()
    {
        await this.btnAddAdditionalDocuments.click()
    }

    //Additonal Information of the Referral
    async clickOnAdditionalInformationOfTheReferralSection()
    {
        await this.expandAdditionalInformationOfTheReferral.click()
    }
    async enterAdditionalInformation(info)
    {
        await this.txtAdditionalInformation.type(info)
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
    async selectClinicalPriority(priority)
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
        await this.page.getByRole('option', { name: service, exact: true }).click()
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