const con = require('../dbConnection');

var salesCloud = {}; //stores sales cloud efficiency data
var cgCloud = {}; //stores CG cloud efficiency data
var serviceCloud = {}; //stores service cloud efficiency data
var marketingCloud = {};
var educationCloud = {};
var nonProfitCloud = {};
var manufacturingCloud = {};
var healthCloud = {};
var financialCloud = {};
var mediaCloud = {};
var automotiveCloud = {};
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
            customerInput2[key] = 'True'
        }

        console.log(customerInput1);
        console.log(customerInput2);

        //GET DATA FROM DATABASE
        ROIHelper.getDataFromDatabase();

        try {
            setTimeout(() => {
                console.log('Efficiency :- ', efficiency);
                res.send({ "Efficiency": efficiency })
            }, 10);

        } catch (error) {
            res.send({ "Failed": "Something went wrong" })
        }

    }

    static cloudFeatures = async (req, res) => {

        var industry = req.body.Industry;
        var response = {};

        try {
            if (con.isConnected) {
                con.connection.query(`SELECT * FROM ROITable WHERE industry = '${industry}' `, (err, result, field) => {

                    if (err) {
                        res.status(400).json({ 'Error': 'An unexpected error has occured' });
                    }

                    //key as cloud name and value as list of features and items of the list are object
                    var optionContent = new Map();
                    result.forEach((item) => {
                        console.log(item);

                        var temp = [];
                        if(optionContent.has(item.cloud_name)) {
                            temp = optionContent.get(item.cloud_name)
                        }
                        var tempListItem = {};
                        tempListItem[item.option_name] = item.option_content;
                        temp.push(tempListItem);

                        optionContent.set(item.cloud_name, temp);
                    });

                    //convert map to object
                    response = Array.from(optionContent, ([CloudName, Features]) => ({ CloudName, Features }));
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
            con.connection.query(`SELECT * FROM SalesCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                console.log(result);
                if (err) {
                    console.log("Failed to fetch data", err);
                }
                else {
                    result.forEach((item) => {
                        salesCloud[item.Industry] = item.medium_Efficiency;
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
                        serviceCloud[item.Industry] = item.medium_Efficiency;
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
                        cgCloud[item.Industry] = item.medium_Efficiency;
                    })

                    console.log('cgCloud -->', cgCloud);
                }
            });

            //GET ALL RECORDS OF MARKETING CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM MarketingCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        marketingCloud[item.Industry] = item.medium_Efficiency;
                    })

                    console.log('marketingCloud -->', marketingCloud);
                }
            });

            //GET ALL RECORDS OF EDUCATION CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM EducationCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        educationCloud[item.Industry] = item.medium_Efficiency;
                    })

                    console.log('educationCloud -->', educationCloud);
                }
            });

            //GET ALL RECORDS OF NON PROFIT CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM NonProfitCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        nonProfitCloud[item.Industry] = item.medium_Efficiency;
                    })

                    console.log('nonProfitCloud -->', nonProfitCloud);
                }
            });

            //GET ALL RECORDS OF MANUFACTURING CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM ManufacturingCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        manufacturingCloud[item.Industry] = item.medium_Efficiency;
                    })

                    console.log('manufacturingCloud -->', manufacturingCloud);
                }
            });

            //GET ALL RECORDS OF HEALTH CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM HealthCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        healthCloud[item.Industry] = item.medium_Efficiency;
                    })

                    console.log('healthCloud -->', healthCloud);
                }
            });

            //GET ALL RECORDS OF FINANCIAL CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM FinancialCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        financialCloud[item.Industry] = item.medium_Efficiency;
                    })

                    console.log('financialCloud -->', financialCloud);
                }
            });

            //GET ALL RECORDS OF MEDIA CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM MediaCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        mediaCloud[item.Industry] = item.medium_Efficiency;
                    })

                    console.log('mediaCloud -->', mediaCloud);
                }
            });

            //GET ALL RECORDS OF AUTOMOTIVE CLOUD IMPLEMENTATION EFFICIENCY
            con.connection.query(`SELECT * FROM AutomotiveCloud_Implementation_Efficiency WHERE Industry = '${customerInput1['Industry']}' `, (err, result, field) => {
                if (err) {
                    console.log("Failed to fetch the record");
                }
                else {
                    result.forEach((item) => {
                        automotiveCloud[item.Industry] = item.medium_Efficiency;
                    })

                    console.log('automotiveCloud -->', automotiveCloud);

                    this.getEfficiency();
                    this.getRevenueAfterInvestment();
                }
            });

            console.log("hello");
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

        sumOfEfficiency = salesCloud[`${customerInput1['Industry']}`] + serviceCloud[`${customerInput1['Industry']}`] + cgCloud[`${customerInput1['Industry']}`] + marketingCloud[`${customerInput1['Industry']}`] + manufacturingCloud[`${customerInput1['Industry']}`] + educationCloud[`${customerInput1['Industry']}`] + nonProfitCloud[`${customerInput1['Industry']}`] + healthCloud[`${customerInput1['Industry']}`] + financialCloud[`${customerInput1['Industry']}`] + mediaCloud[`${customerInput1['Industry']}`] + automotiveCloud[`${customerInput1['Industry']}`];
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
