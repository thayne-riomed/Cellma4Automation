import { test, expect, Page, chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databasePortal");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Environment from "../../../Pages/BaseClasses/Environment";
import AddReferralDetails from "../../../Pages/ReferralPortal/AddReferralDetails";
import TrackReferral from "../../../Pages/ReferralPortal/TrackReferral";

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
        const noPatients = await page.getByText('No patient found').isVisible()
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

        //Enter Referral Service Details
        await addreferraldetails.selectEstablishment(jsonData.referralDetails[index].est_name)
        await addreferraldetails.selectService(jsonData.referralDetails[index].cli_name)
        await page.waitForTimeout(2000)
        await addreferraldetails.selectClinicType(jsonData.referralDetails[index].ref_clinic_type)
        await addreferraldetails.selectClinicLocation() //List item selection is by position and not name
        await addreferraldetails.enterDateOfReferral(jsonData.referralDetails[index].ref_referral_date)
        await addreferraldetails.enterTimeOfReferral(jsonData.referralDetails[index].ref_time_of_arrival)
        await addreferraldetails.selectConsultant(jsonData.referralDetails[index].ref_consultant)
        await addreferraldetails.selectPriority(jsonData.referralDetails[index].ref_clinical_priority_eli_text)
        await addreferraldetails.selectReferralType(jsonData.referralDetails[index].ref_referral_type_eli_text)
        await addreferraldetails.selectReferralReason(jsonData.referralDetails[index].ref_rereferred_reason)
        await addreferraldetails.enterReferralNotes(jsonData.referralDetails[index].ref_notes)
        await addreferraldetails.clickOnReferPatientButton()
        await expect(page.getByText('Referral Added Successfully')).toHaveText('Referral Added Successfully')

        var sqlQuery =
        "select * from patients where pat_est_id = 4 and pat_hospital_ref = '" +
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
        await page.waitForTimeout(2000)

        var sqlFilePath = "SQLResults/ReferralPortal/ReferralData.json";
        var results = await executeQuery(sqlQuery, sqlFilePath);

        sqlQuery = 
        "select * from referrals where ref_pat_id = '" +
        patId +
        "' order by 1 desc limit 1";
        console.log(sqlQuery);
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
        // await page.pause()
    });
});