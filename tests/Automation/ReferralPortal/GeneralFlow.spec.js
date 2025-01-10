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

        //Add Patient Comparison
        var sqlQuery =
        "select * from patients where pat_est_id = 2 and pat_hospital_ref = '" +
        jsonData.patientDetails[index].pat_hospital_ref +
        "' order by pat_id desc limit 1";
        console.log(sqlQuery);

        var sqlFilePath = "SQLResults/ReferralPortal/PatientData.json";
        var results = await executeQuery(sqlQuery, sqlFilePath);

        const patId = results[0].pat_id;
        console.log("Patient id is:" + patId);

        var match = await compareJsons(
            sqlFilePath,
            null,
            jsonData.patientDetails[index]
        );
        if (match) {
            console.log(
                "\n Add Patient Comparison: Parameters from both JSON files match!\n"
            );
        } else {
            console.log(
                "\n Add Patient Comparison: Parameters from both JSON files do not match!\n"
            );
        }

        //Enter Referral Service Details
        await addreferraldetails.selectEstablishment(jsonData.referralDetails[index].est_name)
        await addreferraldetails.selectService(jsonData.referralDetails[index].cli_name)
        await page.waitForTimeout(2000)
        await addreferraldetails.selectClinicType(jsonData.referralDetails[index].ref_clinic_type)
        await addreferraldetails.selectClinicLocation() //List item selection is by position and not name
        await addreferraldetails.enterDateOfReferral(jsonData.referralDetails[index].ref_referral_date)
        await addreferraldetails.enterTimeOfReferral(jsonData.referralDetails[index].ref_time_of_arrival)
        await addreferraldetails.selectConsultant(jsonData.referralDetails[index].ref_consultant)
        await addreferraldetails.selectClinicalPriority(jsonData.referralDetails[index].ref_clinical_priority_eli_text)
        await addreferraldetails.selectReferralType(jsonData.referralDetails[index].ref_referral_type_eli_text)
        await addreferraldetails.selectReferralReason(jsonData.referralDetails[index].ref_rereferred_reason)
        await addreferraldetails.enterReferralNotes(jsonData.referralDetails[index].ref_notes)

        //Enter Condition
        await addreferraldetails.clickOnClinicalSummarySection()
        await addreferraldetails.selectCondition(jsonData.conditionDetails[index].pacr_que_name)
        await addreferraldetails.clickOnAddButton()
        //await addreferraldetails.selectSubCategory('Head Condition')
        await addreferraldetails.enterDateOfDiagnosis(jsonData.conditionDetails[index].cond_date_diagnosed)
        await addreferraldetails.selectPreviousCondition(jsonData.conditionDetails[index].cond_previous)
        await addreferraldetails.selectCheckboxPrivateRecord()
        await addreferraldetails.selectCheckboxPrivateRecord()
        await addreferraldetails.selectCheckboxSetAsDefault()
        await addreferraldetails.selectCheckboxSetAsDefault()
        await addreferraldetails.selectCheckboxAddToFavourites()
        await addreferraldetails.clickOnClosePopup()
        await addreferraldetails.enterNotes(jsonData.conditionDetails[index].cond_notes)
        await addreferraldetails.clickOnSaveButton()
        await page.waitForTimeout(2000)

        var sqlFilePath = "SQLResults/ReferralPortal/ConditionData.json";

        sqlQuery = 
        "select * from conditions join patient_clinical_records on cond_pacr_id = pacr_id where cond_pat_id = '" +
        patId +
        "' order by 1 desc limit 1";
        console.log(sqlQuery);
        results = await executeQuery(sqlQuery, sqlFilePath);

        var match = await compareJsons(
            sqlFilePath,
            null,
            jsonData.conditionDetails[index]
        );
        if (match) {
            console.log(
                "\n Add Condition: Parameters from both JSON files match!\n"
            );
        } else {
            console.log(
                "\n Add Condition: Parameters from both JSON files do not match!\n"
            );
        }
        await page.waitForTimeout(2000)

        //Enter Medication
        await addreferraldetails.clickOnMedicationsSection()
        await addreferraldetails.selectMedication(jsonData.medicationDetails[index].pacr_que_name)
        await addreferraldetails.clickOnAddButton()
        //await addreferraldetails.enterHeight('2')
        await addreferraldetails.selectSubCategory('Medication Dosing')
        await addreferraldetails.enterDose(jsonData.medicationDetails[index].medi_dose)
        await addreferraldetails.selectFrequency(jsonData.medicationDetails[index].medi_frequency)
        await addreferraldetails.selectRoute(jsonData.medicationDetails[index].medi_route)
        await addreferraldetails.enterDays(jsonData.medicationDetails[index].medi_duration)
        await addreferraldetails.selectSite(jsonData.medicationDetails[index].medi_site)
        await addreferraldetails.selectPrescribedBy(jsonData.medicationDetails[index].medi_prescribed_by)
        await addreferraldetails.enterMethod(jsonData.medicationDetails[index].medi_method)
        await addreferraldetails.enterStartDate(jsonData.medicationDetails[index].medi_start_date)
        await addreferraldetails.enterReviewDate('26/12/2024')
        await addreferraldetails.enterStopDate(jsonData.medicationDetails[index].medi_stop_date)
        await addreferraldetails.selectSideEffect(jsonData.medicationDetails[index].mse_text)
        await addreferraldetails.selectStatus(jsonData.medicationDetails[index].medi_status_entry)
        await addreferraldetails.selectIndication('Unknown')
        await addreferraldetails.selectStoppedReason(jsonData.medicationDetails[index].medi_stopped_reason_eli_text)
        await addreferraldetails.selectPGDPSD('PSD')
        await addreferraldetails.selectUserGrades('Prescriber')
        await addreferraldetails.selectMaxRefills('2')
        await addreferraldetails.enterQuantity('5')
        await addreferraldetails.enterUnit('Test Unit')
        await addreferraldetails.selectCurrentLocation('Cath Lab Ward')
        await addreferraldetails.enterLinkToDiagnosis('Filler Diagnosis')
        await addreferraldetails.selectAdherent('Non Adherent')
        await addreferraldetails.selectCheckboxPrescriptionAndSupply()
        await addreferraldetails.selectCheckboxSupply()
        await addreferraldetails.selectCheckboxPrivateRecord()
        await addreferraldetails.selectCheckboxSuitableForHomeDelivery()
        await addreferraldetails.selectCheckboxSetAsDefault()
        await addreferraldetails.selectCheckboxAddToPrescription()
        await addreferraldetails.selectCheckboxAddToPrescription()
        await addreferraldetails.enterForCondition('Hypertension')
        await addreferraldetails.enterNotes(jsonData.medicationDetails[index].medi_notes)
        await addreferraldetails.clickOnVariableDoseLink()
        await page.waitForLoadState()
        await addreferraldetails.enterVariableDose('3')
        await addreferraldetails.selectVariableFrequency('p.c (after food)')
        await addreferraldetails.selectVariableRoute('Sublingual')
        await addreferraldetails.enterVariableDuration('5')
        await addreferraldetails.enterVariableNumberToDispense('10')
        await addreferraldetails.clickOnSaveVariableDose()
        await addreferraldetails.clickOnCloseVariableDose()
        await addreferraldetails.clickOnSaveButton()
        await page.waitForTimeout(2000)

        var sqlFilePath = "SQLResults/ReferralPortal/MedicationData.json";

        sqlQuery = 
        "select * from medications join patient_clinical_records on medi_pacr_id = pacr_id join medication_side_effects on mse_pacr_id = pacr_id where pacr_pat_id = '" +
        patId +
        "' order by 1 desc limit 1";
        console.log(sqlQuery);
        results = await executeQuery(sqlQuery, sqlFilePath);

        var match = await compareJsons(
            sqlFilePath,
            null,
            jsonData.medicationDetails[index]
        );
        if (match) {
            console.log(
                "\n Add Medication: Parameters from both JSON files match!\n"
            );
        } else {
            console.log(
                "\n Add Medication: Parameters from both JSON files do not match!\n"
            );
        }
        await page.waitForTimeout(2000)

        //Enter Investigation
        await addreferraldetails.clickOnInvestigationsSection()
        await addreferraldetails.selectInvestigation(jsonData.investigationDetails[index].pacr_que_name)
        await addreferraldetails.clickOnAddButton()
        await addreferraldetails.selectSubCategory('Microbiology Investigations')
        await addreferraldetails.selectStatus(jsonData.investigationDetails[index].inv_status_entry)
        //await addreferraldetails.selectOutstandingInvestigation()
        await addreferraldetails.selectReason('High risk patient')
        await addreferraldetails.enterResults('Test Results')
        await addreferraldetails.selectOutcome('Negative')
        await addreferraldetails.selectCritical('No')
        await addreferraldetails.enterLinkToDiagnosis('Test diagnosis')
        await addreferraldetails.enterDateOfUpload('23/12/2024')
        await addreferraldetails.selectPatientCurrentLocation('Cardiology Ward')
        await addreferraldetails.enterCompletedDate(jsonData.investigationDetails[index].inv_completed)
        await addreferraldetails.enterReviewDate(jsonData.investigationDetails[index].inv_review_date)
        await addreferraldetails.selectPriority('High')
        await addreferraldetails.enterRequestedBy('Malcolm Richards')
        //await addreferraldetails.selectSendTo()
        await addreferraldetails.selectExternalLocation('Ext location 1')
        await addreferraldetails.selectCheckboxForImagingRequest()
        await addreferraldetails.selectCheckboxForLabRequest()
        await addreferraldetails.selectCheckboxShareOnPortal()
        await addreferraldetails.selectCheckboxAddToAlert()
        await addreferraldetails.selectCheckboxPrivateRecord()
        await addreferraldetails.selectCheckboxSetAsDefault()
        await addreferraldetails.enterNotes(jsonData.investigationDetails[index].inv_notes)
        await addreferraldetails.clickOnSaveButton();
        await page.waitForTimeout(2000)

        var sqlFilePath = "SQLResults/ReferralPortal/InvestigationData.json";
        sqlQuery = 
        "select * from investigations join patient_clinical_records on inv_pacr_id = pacr_id where pacr_pat_id = '" +
        patId +
        "' order by 1 desc limit 1";
        console.log(sqlQuery);
        results = await executeQuery(sqlQuery, sqlFilePath);

        var match = await compareJsons(
            sqlFilePath,
            null,
            jsonData.investigationDetails[index]
        );
        if (match) {
            console.log(
                "\n Add Investigation: Parameters from both JSON files match!\n"
            );
        } else {
            console.log(
                "\n Add Investigation: Parameters from both JSON files do not match!\n"
            );
        }
        await page.waitForTimeout(2000)

        //Patient Scans
        await addreferraldetails.clickOnPatientScansSection()
        await addreferraldetails.selectPatientScan(jsonData.patientScanDetails[index].pacr_que_name)
        await addreferraldetails.selectCategory('Investigations')
        await addreferraldetails.clickOnAddButton()
        await addreferraldetails.selectSubCategory('Xray')
        await addreferraldetails.selectType(jsonData.patientScanDetails[index].pascn_scan_type_eli_text)
        await addreferraldetails.enterScanDate(jsonData.patientScanDetails[index].pascn_scan_date)
        await addreferraldetails.selectScanArea(jsonData.patientScanDetails[index].pascn_site_name)
        await addreferraldetails.enterBMDScore(jsonData.patientScanDetails[index].pascn_bmd_score)
        await addreferraldetails.enterTScore(jsonData.patientScanDetails[index].pascn_t_score)
        await addreferraldetails.enterZScore(jsonData.patientScanDetails[index].pascn_z_score)
        await addreferraldetails.selectMachineName(jsonData.patientScanDetails[index].pascn_machine_name)
        await addreferraldetails.selectCheckboxPrivateRecord()
        await addreferraldetails.selectCheckboxSetAsDefault()
        await addreferraldetails.selectCheckboxAddToFavourites()
        await addreferraldetails.clickOnClosePopup()

        let fileInput = page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-3 css-1pmmlk2']//input[@aria-label='button']")
        let filePath = "../Cellma4Automation/UploadDocuments/PatientPic.png";
        await fileInput.setInputFiles(filePath,fileInput);

        await addreferraldetails.enterNotes(jsonData.patientScanDetails[index].pascn_notes)
        await addreferraldetails.clickOnSaveButton()
        await page.waitForTimeout(2000)

        var sqlFilePath = "SQLResults/ReferralPortal/PatientScanData.json";
        sqlQuery = 
        "select * from patient_scans join patient_clinical_records on pascn_pacr_id = pacr_id where pacr_pat_id = '" +
        patId +
        "' order by 1 desc limit 1";
        console.log(sqlQuery);
        results = await executeQuery(sqlQuery, sqlFilePath);

        var match = await compareJsons(
            sqlFilePath,
            null,
            jsonData.patientScanDetails[index]
        );
        if (match) {
            console.log(
                "\n Add Patient Scan: Parameters from both JSON files match!\n"
            );
        } else {
            console.log(
                "\n Add Patient Scan: Parameters from both JSON files do not match!\n"
            );
        }
        await page.waitForTimeout(2000)

        //Procedures
        await addreferraldetails.clickOnProceduresSection()
        await addreferraldetails.selectProcedure(jsonData.procedureDetails[index].pacr_que_name)
        await addreferraldetails.clickOnAddButton()
        await addreferraldetails.selectSubCategory('General Procedure')
        await addreferraldetails.enterDateOfProcedure(jsonData.procedureDetails[index].proc_procedure_date)
        await addreferraldetails.selectType(jsonData.procedureDetails[index].proc_type_entry)
        await addreferraldetails.selectSite(jsonData.procedureDetails[index].proc_site_entry)
        await addreferraldetails.enterPerformedByHpConsultants('Test Consultant')
        await addreferraldetails.selectLevel(jsonData.procedureDetails[index].proc_procedure_level_entry)
        await addreferraldetails.selectStatus(jsonData.procedureDetails[index].proc_status_entry)
        await addreferraldetails.selectOutcome(jsonData.procedureDetails[index].proc_outcome_entry)
        await addreferraldetails.selectLinkToClinicLocation('Cardiology Ward')
        await addreferraldetails.enterLinkToClinicDiagnosis('Test Diagnosis')
        //await addreferraldetails.selectLinkToWorklist('')
        await addreferraldetails.enterLinkToExistingCondition('Hypertension')
        await addreferraldetails.enterCompletionDate(jsonData.procedureDetails[index].proc_completed_date)
        await addreferraldetails.selectCheckboxDeviceRequired()
        await addreferraldetails.selectCheckboxPrivateRecord()
        await addreferraldetails.selectCheckboxSetAsDefault()
        await addreferraldetails.enterNotes(jsonData.procedureDetails[index].proc_notes)
        await addreferraldetails.clickOnSaveButton()
        await page.waitForTimeout(2000)

        var sqlFilePath = "SQLResults/ReferralPortal/ProcedureData.json";
        sqlQuery = 
        "select * from procedures join patient_clinical_records on proc_pacr_id = pacr_id where pacr_pat_id = '" +
        patId +
        "' order by 1 desc limit 1";
        console.log(sqlQuery);
        results = await executeQuery(sqlQuery, sqlFilePath);

        var match = await compareJsons(
            sqlFilePath,
            null,
            jsonData.procedureDetails[index]
        );
        if (match) {
            console.log(
                "\n Add Procedure: Parameters from both JSON files match!\n"
            );
        } else {
            console.log(
                "\n Add Procedure: Parameters from both JSON files do not match!\n"
            );
        }
        await page.waitForTimeout(2000)

        //Referral Documents
        await addreferraldetails.clickOnReferralDocumentsSection()
        await page.pause()
        await addreferraldetails.selectDocumentCategory(jsonData.referralDocuments[index].doc_category)
        fileInput = page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 css-1s50f5r']//input[@aria-label='button']")
        filePath = "../Cellma4Automation/UploadDocuments/PatientPic.png";
        await fileInput.setInputFiles(filePath,fileInput);
        await addreferraldetails.enterRefDocNotes(jsonData.referralDocuments[index].doc_description)

        //Additional Referral Information
        await addreferraldetails.clickOnAdditionalInformationOfTheReferralSection()
        await addreferraldetails.enterAdditionalInformation(jsonData.referralDetails[index].refd_additional_notes)

        await addreferraldetails.clickOnReferPatientButton()
        //await expect(page.getByText('Referral Added Successfully')).toHaveText('Referral Added Successfully')
        await page.waitForTimeout(2000)

        var sqlFilePath = "SQLResults/ReferralPortal/ReferralDocData.json";
        sqlQuery = 
        "select * from document_management where doc_pat_id = '" +
        patId +
        "' order by 1 desc limit 1";
        console.log(sqlQuery);
        results = await executeQuery(sqlQuery, sqlFilePath);

        var match = await compareJsons(
            sqlFilePath,
            null,
            jsonData.referralDocuments[index]
        );
        if (match) {
            console.log(
                "\n Add Referral Documents: Parameters from both JSON files match!\n"
            );
        } else {
            console.log(
                "\n Add Referral Documents: Parameters from both JSON files do not match!\n"
            );
        }
        await page.waitForTimeout(2000)

        sqlQuery = 
        "select * from referrals join referral_details on ref_id = refd_id where ref_pat_id = '" +
        patId +
        "' order by 1 desc limit 1";
        console.log(sqlQuery);

        var sqlFilePath = "SQLResults/ReferralPortal/ReferralData.json";
        results = await executeQuery(sqlQuery, sqlFilePath);

        var match = await compareJsons(
            sqlFilePath,
            null,
            jsonData.referralDetails[index]
        );
        if (match) {
            console.log(
                "\n Add Referral Comparison: Parameters from both JSON files match!\n"
            );
        } else {
            console.log(
                "\n Add Referral Comparison: Parameters from both JSON files do not match!\n"
            );
        }
        await addreferraldetails.clickOnTrackReferralButton()

        //Track Referral
        await trackreferral.enterStartDate(jsonData.referralDetails[index].ref_referral_date)
        await trackreferral.enterEndDate(jsonData.referralDetails[index].ref_referral_date)
        await trackreferral.selectStatus(jsonData.referralDetails[index].ref_status)
        await trackreferral.clickOnSearchButton()
        await page.waitForTimeout(10000)    
        await trackreferral.clickOnLogoutButton()

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