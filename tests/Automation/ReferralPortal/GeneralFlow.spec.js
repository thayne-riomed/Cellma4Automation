import { test, expect, Page, chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databasePortal");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Environment from "../../../Pages/BaseClasses/Environment";
import AddReferralDetails from "../../../Pages/ReferralPortal/AddReferralDetails";
import TrackReferral from "../../../Pages/ReferralPortal/TrackReferral";
import Homepage from '../../../Pages/BaseClasses/Homepage';
import ServiceReferrals from '../../../Pages/ReferralDomain/ServiceReferrals';

let jsonData;
let index=0;

test.describe("Database Comparison Referral Portal", () => {
    test("Extract Patient Details", async ({}) => {
        const excelFilePath =
            process.env.EXCEL_FILE_PATH || "./ExcelFiles/ReferralPortal.xlsx";
        const jsonFilePath =
            "./TestDataWithJSON/ReferralPortal/ReferralPortal.json";
        const conversionSuccess = await convertExcelToJson(
            excelFilePath,
            jsonFilePath
        );

        if (conversionSuccess) {
            jsonData = require("../../../TestDataWithJSON/ReferralPortal/ReferralPortal.json");
            console.log("Excel file has been converted successfully!");
            console.log("jsonData:", jsonData); // Log the loaded JSON data
            console.log("excelFilePath after conversion:", excelFilePath);
            console.log("jsonFilePath after conversion:", jsonFilePath);
        } else {
            throw new Error("Excel to JSON conversion failed.");
        }
    });

    test('Add Referral Details @ReferralPortal',async ({page})=>{

        const loginpage=new LoginPage(page)    
        const environment=new Environment(page)
        const addreferraldetails=new AddReferralDetails(page)
        const trackreferral=new TrackReferral(page)
        const homepage = new Homepage(page)
        const servicereferral=new ServiceReferrals(page)
        
        await page.goto(environment.RefPortal)
        await loginpage.enterReferralPortalUserName(jsonData.loginDetails[index].username)    
        await loginpage.enterRefrralPortalPassword(jsonData.loginDetails[index].password);
        await loginpage.clickOnReferralPortalLoginButton()
        await expect(page.getByText('Login success')).toHaveText('Login success')

        //Patient Search
        await addreferraldetails.enterGivenName(jsonData.patientDetails[index].pat_firstname)
        await addreferraldetails.enterFamilyName(jsonData.patientDetails[index].pat_surname)
        await addreferraldetails.selectSex(jsonData.patientDetails[index].pat_sex_entry)
        await addreferraldetails.enterBornDate(jsonData.patientDetails[index].pat_dob)
        await addreferraldetails.clickOnSearchButton()
        //Create new patient
        const noPatients = await page.locator("xpath=//span[@class='MuiTypography-root MuiTypography-body1 css-4gc644']").isVisible()
        if (noPatients) {
            await addreferraldetails.clickOnAddPatientButton()
            await addreferraldetails.clickOnPatientDetailsAccordion()
            await addreferraldetails.clickOnPatientDetailsAccordion()
            await addreferraldetails.clickOnCreatePatientButton()
            await addreferraldetails.enterIdentifer(jsonData.patientDetails[index].pat_identifier)
            await addreferraldetails.selectTitle(jsonData.patientDetails[index].pat_title)
            await addreferraldetails.enterGivenName(jsonData.patientDetails[index].pat_firstname)
            await addreferraldetails.enterFamilyName(jsonData.patientDetails[index].pat_surname)
            await addreferraldetails.selectSex(jsonData.patientDetails[index].pat_sex_entry)
            await addreferraldetails.enterBornDate(jsonData.patientDetails[index].pat_dob)
            await addreferraldetails.enterHosptialRefNumber(jsonData.patientDetails[index].pat_hospital_ref)
            await addreferraldetails.clickOnCreatePatientButton()
        }
        else {
            await addreferraldetails.clickOnPatientSelect()
        }

        // //Enter Referral Service Details
        // await addreferraldetails.selectEstablishment(jsonData.referralDetails[index].est_name)
        // await addreferraldetails.selectService(jsonData.referralDetails[index].cli_name)
        // await page.waitForTimeout(2000)
        // await addreferraldetails.selectClinicType(jsonData.referralDetails[index].ref_clinic_type)
        // await addreferraldetails.selectClinicLocation() //List item selection is by position and not name
        // await addreferraldetails.enterDateOfReferral(jsonData.referralDetails[index].ref_referral_date)
        // await addreferraldetails.enterTimeOfReferral(jsonData.referralDetails[index].ref_time_of_arrival)
        // await addreferraldetails.selectConsultant(jsonData.referralDetails[index].ref_consultant)
        // await addreferraldetails.selectClinicalPriority(jsonData.referralDetails[index].ref_clinical_priority_eli_text)
        // await addreferraldetails.selectReferralType(jsonData.referralDetails[index].ref_referral_type_eli_text)
        // await addreferraldetails.selectReferralReason(jsonData.referralDetails[index].ref_rereferred_reason)
        // await addreferraldetails.enterReferralNotes(jsonData.referralDetails[index].ref_notes)

        // //Enter Condition
        // await addreferraldetails.clickOnClinicalSummarySection()
        // await addreferraldetails.selectCondition('Hypertension')
        // await addreferraldetails.clickOnAddButton()
        // //await addreferraldetails.selectSubCategory('Head Condition')
        // await addreferraldetails.enterDateOfDiagnosis('06/12/2024')
        // await addreferraldetails.selectPreviousCondition()
        // await addreferraldetails.selectCheckboxPrivateRecord()
        // await addreferraldetails.selectCheckboxPrivateRecord()
        // await addreferraldetails.selectCheckboxSetAsDefault()
        // await addreferraldetails.selectCheckboxSetAsDefault()
        // await addreferraldetails.selectCheckboxAddToFavourites()
        // await addreferraldetails.clickOnClosePopup()
        // await addreferraldetails.enterNotes('Note has been added for testing')
        // await addreferraldetails.clickOnSaveButton()

        // //Enter Medication
        // await addreferraldetails.clickOnMedicationsSection()
        // await addreferraldetails.selectMedication('Atenolol 10mg tablets')
        // await addreferraldetails.clickOnAddButton()
        // //await addreferraldetails.enterHeight('2')
        // await addreferraldetails.selectSubCategory('Medication Dosing')
        // await addreferraldetails.enterDose('1')
        // await addreferraldetails.selectFrequency('continuous')
        // await addreferraldetails.selectRoute('Dental')
        // await addreferraldetails.enterDays('5')
        // await addreferraldetails.selectSite('Bilateral')
        // await addreferraldetails.selectPrescribedBy('Self')
        // await addreferraldetails.enterMethod('Test Method')
        // await addreferraldetails.enterStartDate('19/12/2024')
        // await addreferraldetails.enterReviewDate('26/12/2024')
        // await addreferraldetails.enterStopDate('31/12/2024')
        // await addreferraldetails.selectSideEffect('sickness')
        // await addreferraldetails.selectStatus('Produced')
        // await addreferraldetails.selectIndication('Unknown')
        // await addreferraldetails.selectStoppedReason('Increased dose')
        // await addreferraldetails.selectPGDPSD('PSD')
        // await addreferraldetails.selectUserGrades('Prescriber')
        // await addreferraldetails.selectMaxRefills('2')
        // await addreferraldetails.enterQuantity('5')
        // await addreferraldetails.enterUnit('Test Unit')
        // await addreferraldetails.selectCurrentLocation('Cath Lab Ward')
        // await addreferraldetails.enterLinkToDiagnosis('Filler Diagnosis')
        // await addreferraldetails.selectAdherent('Non Adherent')
        // await addreferraldetails.selectCheckboxPrescriptionAndSupply()
        // await addreferraldetails.selectCheckboxSupply()
        // await addreferraldetails.selectCheckboxPrivateRecord()
        // await addreferraldetails.selectCheckboxSuitableForHomeDelivery()
        // await addreferraldetails.selectCheckboxSetAsDefault()
        // await addreferraldetails.selectCheckboxAddToPrescription()
        // await addreferraldetails.enterForCondition('Hypertension')
        // await addreferraldetails.enterNotes('Medication addition test.')
        // await addreferraldetails.clickOnVariableDoseLink()
        // await page.waitForLoadState()
        // await addreferraldetails.enterVariableDose('3')
        // await addreferraldetails.selectVariableFrequency('p.c (after food)')
        // await addreferraldetails.selectVariableRoute('Sublingual')
        // await addreferraldetails.enterVariableDuration('5')
        // await addreferraldetails.enterVariableNumberToDispense('10')
        // await addreferraldetails.clickOnSaveVariableDose()
        // await addreferraldetails.clickOnCloseVariableDose()
        // await addreferraldetails.clickOnSaveButton()

        // //Enter Investigation
        // await addreferraldetails.clickOnInvestigationsSection()
        // await addreferraldetails.selectInvestigation('Liver Function Test')
        // await addreferraldetails.clickOnAddButton()
        // await addreferraldetails.selectSubCategory('Microbiology Investigations')
        // await addreferraldetails.selectStatus('Completed')
        // //await addreferraldetails.selectOutstandingInvestigation()
        // await addreferraldetails.selectReason('High risk patient')
        // await addreferraldetails.enterResults('Test Results')
        // await addreferraldetails.selectOutcome('Negative')
        // await addreferraldetails.selectCritical('No')
        // await addreferraldetails.enterLinkToDiagnosis('Test diagnosis')
        // await addreferraldetails.enterDateOfUpload('23/12/2024')
        // await addreferraldetails.selectPatientCurrentLocation('Cardiology Ward')
        // await addreferraldetails.enterCompletedDate('23/12/2024')
        // await addreferraldetails.enterReviewDate('30/12/2024')
        // await addreferraldetails.selectPriority('High')
        // await addreferraldetails.enterRequestedBy('Malcolm Richards')
        // //await addreferraldetails.selectSendTo()
        // await addreferraldetails.selectExternalLocation('Ext location 1')
        // await addreferraldetails.selectCheckboxForImagingRequest()
        // await addreferraldetails.selectCheckboxForLabRequest()
        // await addreferraldetails.selectCheckboxShareOnPortal()
        // await addreferraldetails.selectCheckboxAddToAlert()
        // await addreferraldetails.selectCheckboxPrivateRecord()
        // await addreferraldetails.selectCheckboxSetAsDefault()
        // await addreferraldetails.enterNotes('Investigation notes test entry')
        // await addreferraldetails.clickOnSaveButton();



        // //Patient Scans
        // await addreferraldetails.clickOnPatientScansSection()
        // await addreferraldetails.selectPatientScan('Heel DEXA scan')
        // await addreferraldetails.selectCategory('Investigations')
        // await addreferraldetails.clickOnAddButton()
        // await addreferraldetails.selectSubCategory('Xray')
        // await addreferraldetails.selectType('CT Scan')
        // await addreferraldetails.enterScanDate('24/12/2024')
        // await addreferraldetails.selectScanArea('Hip and Spine')
        // await addreferraldetails.enterBMDScore('BMD Score')
        // await addreferraldetails.enterTScore('T Score')
        // await addreferraldetails.enterZScore('Z Score')
        // await addreferraldetails.selectMachineName('Ultrasound')
        // await addreferraldetails.selectCheckboxPrivateRecord()
        // await addreferraldetails.selectCheckboxSetAsDefault()
        // await addreferraldetails.selectCheckboxAddToFavourites()
        // await addreferraldetails.clickOnClosePopup()

        // let fileInput = page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-3 css-1pmmlk2']//input[@aria-label='button']")
        // let filePath = "../Cellma4Automation/UploadDocuments/PatientPic.png";
        // await fileInput.setInputFiles(filePath,fileInput);

        // await addreferraldetails.enterNotes('Patient scan data entry test')
        // await addreferraldetails.clickOnSaveButton() //Save button is currently not working.

        // //Procedures
        // await addreferraldetails.clickOnProceduresSection()
        // await addreferraldetails.selectProcedure('Whipple Procedure')
        // await addreferraldetails.clickOnAddButton()
        // await addreferraldetails.selectSubCategory('General Procedure')
        // await addreferraldetails.enterDateOfProcedure('24/12/2024')
        // await addreferraldetails.selectType('Low')
        // await addreferraldetails.selectSite('Right')
        // await addreferraldetails.enterPerformedByHpConsultants('Testing?')
        // await addreferraldetails.selectLevel('Tertiary')
        // await addreferraldetails.selectStatus('Completed')
        // await addreferraldetails.selectOutcome('Abnormal')
        // await addreferraldetails.selectLinkToClinicLocation('Cardiology Ward')
        // await addreferraldetails.enterLinkToClinicDiagnosis('Test Diagnosis')
        // //await addreferraldetails.selectLinkToWorklist('')
        // await addreferraldetails.enterLinkToExistingCondition('Hypertension')
        // await addreferraldetails.enterCompletionDate('24/12/2024')
        // await addreferraldetails.selectCheckboxDeviceRequired()
        // await addreferraldetails.selectCheckboxPrivateRecord()
        // await addreferraldetails.selectCheckboxSetAsDefault()
        // await addreferraldetails.enterNotes('Procedure data entry test')
        // await addreferraldetails.clickOnSaveButton()

        // //Referral Documents
        // await addreferraldetails.clickOnReferralDocumentsSection()
        // await addreferraldetails.selectDocumentCategory('Device')
        // fileInput = page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 css-1s50f5r']//input[@aria-label='button']")
        // filePath = "../Cellma4Automation/UploadDocuments/PatientPic.png";
        // await fileInput.setInputFiles(filePath,fileInput);
        // await addreferraldetails.enterRefDocNotes('Referral Document data entry test')

        // //Additional Referral Information
        // await addreferraldetails.clickOnAdditionalInformationOfTheReferralSection()
        // await addreferraldetails.enterAdditionalInformation('Additional information of the referral data entry test')

        // await addreferraldetails.clickOnReferPatientButton()
        // await expect(page.getByText('Referral Added Successfully')).toHaveText('Referral Added Successfully')

        // var sqlQuery =
        // "select * from patients where pat_est_id = 2 and pat_hospital_ref = '" +
        // jsonData.patientDetails[index].pat_hospital_ref +
        // "' order by pat_id desc limit 1";
        // console.log(sqlQuery);
        // var sqlFilePath = "SQLResults/ReferralPortal/PatientData.json";
        // var results = await executeQuery(sqlQuery, sqlFilePath);

        // const patId = results[0].pat_id;
        // console.log("Patient id is:" + patId);

        // var match = await compareJsons(
        //     sqlFilePath,
        //     null,
        //     jsonData.patientDetails[index]
        // );
        // if (match) {
        //     console.log(
        //         "\n Add Patient Comparison: Parameters from both JSON files match!\n"
        //     );
        // } else {
        //     console.log(
        //         "\n Add Patient Comparison: Parameters from both JSON files do not match!\n"
        //     );
        // }
        // await page.waitForTimeout(2000)

        // var sqlFilePath = "SQLResults/ReferralPortal/ReferralData.json";
        // var results = await executeQuery(sqlQuery, sqlFilePath);

        // sqlQuery = 
        // "select * from referrals where ref_pat_id = '" +
        // patId +
        // "' order by 1 desc limit 1";
        // console.log(sqlQuery);
        // results = await executeQuery(sqlQuery, sqlFilePath);

        // var match = await compareJsons(
        //     sqlFilePath,
        //     null,
        //     jsonData.referralDetails[index]
        // );
        // if (match) {
        //     console.log(
        //         "\n Add Referral Comparison: Parameters from both JSON files match!\n"
        //     );
        // } else {
        //     console.log(
        //         "\n Add Referral Comparison: Parameters from both JSON files do not match!\n"
        //     );
        // }
        // await addreferraldetails.clickOnTrackReferralButton()

        // //Track Referral
        // await trackreferral.enterStartDate(jsonData.referralDetails[index].ref_referral_date)
        // await trackreferral.enterEndDate(jsonData.referralDetails[index].ref_referral_date)
        // await trackreferral.selectStatus(jsonData.referralDetails[index].ref_status)
        // await trackreferral.clickOnSearchButton()
        // await page.waitForTimeout(10000)    
        // await trackreferral.clickOnLogoutButton()

        //Accept Referral
        await page.goto(environment.RefPortalCellma)
        await loginpage.enterUsername(jsonData.loginDetails[0].username)
        await page.waitForTimeout(1500)
        await loginpage.enter_Password(jsonData.loginDetails[0].password)   
        await page.waitForTimeout(1500)
        await loginpage.clickOnLogin()
        await homepage.clickonSidebarHomeIcon() 
        await homepage.clickOnOurPendingonReferrals()    
        await servicereferral.enterStartDate(jsonData.referralDetails[index].ref_referral_date)
        await servicereferral.enterEndDate(jsonData.referralDetails[index].ref_referral_date)
        await servicereferral.selectStatusTypeAwaitingAcceptance()    
        await servicereferral.clickOnSearchButton()
        await servicereferral.clickOnAcceptLink()
        await page.pause()

    });
});