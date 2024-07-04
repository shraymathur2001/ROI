const con = require('../dbConnection');

var salesCloud = {}; //stores sales cloud efficiency data
var cgCloud = {}; //stores CG cloud efficiency data
var serviceCloud = {}; //stores service cloud efficiency data
var customerInput2 = {}; //stores the customer input 2 table data
var customerInput1 = {}; //stores the customer input 1 table data
var salesCloudLicenses = {}; //stores sales cloud crm licenses table data
var efficiency;
var revenueAfterInvestment;
var returnOfInvestment;

class CaluclateROI {

    static efficiency = async (req, res) => {

        // SET THE INPUT GETTING FROM FRONTEND
        customerInput1['Industry'] = req.body.BusinessIndustry;
        customerInput1['Current Revenue'] = req.body.CurrentRevenue;
        customerInput1['Number of Employees'] = req.body.Employees;

        for (const key in req.body.SalesforceProducts) {
            if (key == 'Sales') {
                customerInput2['Sales Cloud'] = 'True'
            }
            if (key == 'Support') {
                customerInput2['Service Cloud'] = 'True'
            }
            if (key == 'ConsumerGood') {
                customerInput2['CG Cloud'] = 'True'
            }
            if (key == 'NonProfit') {
                customerInput2['NPSP'] = 'True'
            }
            if (key == 'CPQ') {
                customerInput2['CPQ'] = 'True'
            }
            if (key == 'ServiceCloudVoice') {
                customerInput2['Service Cloud Voice'] = 'True'
            }
        }

        console.log(customerInput1);
        console.log(customerInput2);

        //GET DATA FROM DATABASE
        ROIHelper.getDataFromDatabase();

        try {
            setTimeout(() => {
                res.send({ "Efficiency": efficiency })
            }, 10);

        } catch (error) {
            res.send({ "Failed": "Something went wrong" })
        }

    }

    static cloudFeatures = async (req, res) => {

        var industry = req.body.Industry;
        var cloudName = req.body.CloudName;
        var response = {};
        var optionContentList = [];

        console.log(industry, ' ', cloudName);

        try {
            if (con.isConnected) {
                con.connection.query(`SELECT * FROM ROITable WHERE industry = '${industry}' AND cloud_name = '${cloudName}' `, (err, result, field) => {

                    if (err) {
                        res.status(400).json({ 'Error': 'An unexpected error has occured' });
                    }

                    console.log(result);

                    result.forEach((item) => {
                        var optionContent = {}
                        optionContent[item.option_name] = item.option_content;
                        optionContentList.push(optionContent)
                    });

                    response[cloudName] = optionContentList;
                    //console.log(response);
                    res.send(response);
                });
            }

        } catch (error) {
            console.log('Failed to fetch feature', error);
            res.status(400).json({ 'Error': 'An unexpected error has occured' });
        }
    }

    static licensesAndCost = async (req, res) => {
        var selectedOptions = req.body.options;

        var queryData = [selectedOptions];
        var licenseAndCostMapping = {};
        var totalAmount = 0;

        con.connection.query('SELECT * FROM ROITable WHERE option_name IN (?)', queryData, (err, result, field) => {

            if (err) {
                res.status(400).json({ 'Error': 'An unexpected error has occured' });
            }

            console.log(result);

            result.forEach((item) => {
                licenseAndCostMapping[item.license] = item.price_per_year_per_user;
            });

            for (const key in licenseAndCostMapping) {
                totalAmount += licenseAndCostMapping[key];
            }
            res.status(200).json({ "Licenses": licenseAndCostMapping, "TotalAmount": totalAmount });
        })
    }

}

class ROIHelper {

    static getDataFromDatabase = () => {

        console.log('isConnected -->', con.isConnected);
        if (con.isConnected) {

            //GET ALL RECORDS OF SALES CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT Industry, Efficiency FROM SalesCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                console.log(result);
                if (err) {
                    console.log("Failed to fetch data", err);
                }
                else {
                    result.forEach((item) => {
                        salesCloud[item.Industry] = item.Efficiency;
                    })
                    console.log('salesCloud -->', salesCloud);
                }
            })

            //GET ALL RECORDS OF SERVICE CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM ServiceCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        serviceCloud[item.Industry] = item.Efficiency;
                    })

                    console.log('serviceCloud -->', serviceCloud);
                }
            });

            //GET ALL RECORDS OF CG CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM CGCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        cgCloud[item.Industry] = item.Efficiency;
                    })

                    console.log('cgCloud -->', cgCloud);

                    this.getEfficiency();
                    this.getRevenueAfterInvestment();
                    // this.getReturnOfInvestment();
                }
            });
        }
    }

    static getEfficiency = () => {

        var sumOfEfficiency = 0;
        var countOfEfficiency = 0;

        for (const key in customerInput2) {
            if (customerInput2[key] == 'True') {
                countOfEfficiency += 1;
            }
        }

        sumOfEfficiency = salesCloud[`${customerInput1['Industry']}`] + serviceCloud[`${customerInput1['Industry']}`] + cgCloud[`${customerInput1['Industry']}`];
        efficiency = (sumOfEfficiency / (countOfEfficiency * 100)) * 100;

        console.log('sumOfEfficiency -->', sumOfEfficiency);
        console.log('efficiency -->', efficiency);
    }

    static getRevenueAfterInvestment = () => {

        revenueAfterInvestment = customerInput1['Current Revenue'] + ((customerInput1['Current Revenue']) * (efficiency / 100));
        console.log('revenueAfterInvestment -->', revenueAfterInvestment);
    }

    static getReturnOfInvestment = () => {
        returnOfInvestment = revenueAfterInvestment - (salesCloudLicenses['Salesforce '][0] * salesCloudLicenses['Salesforce '][1] * customerInput1['Numbr of Employees']);
        console.log('returnOfInvestment -->', returnOfInvestment);
    }
}


module.exports = CaluclateROI;
