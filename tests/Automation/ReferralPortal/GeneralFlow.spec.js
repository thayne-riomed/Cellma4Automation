import { test, expect, Page, chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Environment from "../../../Pages/BaseClasses/Environment";
import PortalHome from "../../../Pages/ReferralPortal/PortalHome";
import PortalSelectScreen from "../../../Pages/ReferralPortal/PortalSelectScreen";
import AddReferralDetails from "../../../Pages/ReferralPortal/AddReferralDetails";
import PatientSearchCustomizable from "../../../Pages/ReferralPortal/PatientSearchCustomizable";

let jsonData;

test.describe("Database Comparison Add Edit Patient", () => {
    test("Extract Patient Details", async ({}) => {
    const excelFilePath =
        process.env.EXCEL_FILE_PATH || "./ExcelFiles/AppointmentDomain.xlsx";
    const jsonFilePath =
        "./TestDataWithJSON/AppointmentDomain/AppointmentDetails.json";
    const conversionSuccess = await convertExcelToJson(
        excelFilePath,
        jsonFilePath
    );

    if (conversionSuccess) {
        jsonData = require("../../../TestDataWithJSON/AppointmentDomain/AppointmentDetails.json");
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
        const portalhome=new PortalHome(page)
        const portalselectscreen=new PortalSelectScreen(page)
        const addreferraldetails=new AddReferralDetails(page)
        const patientsearchcustomizable=new PatientSearchCustomizable(page)
        
    
        await page.goto(environment.RefPortal)
        await page.pause()

    });
});