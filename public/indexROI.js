const Timelinescontent = document.querySelectorAll('.timeline-content')
const SalesTeamSize = document.getElementById('SalesTeamSize')
const MarketingTeamSize = document.getElementById('MarketingTeamSize')
const SupportTeamSize = document.getElementById('SupportTeamSize')
const OperationTeamSize = document.getElementById('OperationTeamSize')
const TotalRevenue = document.getElementById('TotalRevenue')
const GetCompanyName = document.getElementById('CompanyName');
const Marketing = document.getElementById('Marketing')
const Support = document.getElementById('Support')
const Operation = document.getElementById('Operations')

const Nextbutton = document.querySelectorAll(".Next");
const Previousbutton = document.querySelectorAll(".Previous");
const Container = document.querySelectorAll(".container");
let Timelineitem = document.querySelectorAll(".timeline-item");
const Option = document.querySelectorAll(".option");
const Timelines = document.querySelectorAll('.timeline-icon')
const multiselectContainer = document.querySelectorAll('.Multiselect-container');


const ErrorFields = document.getElementsByClassName("error");
const addclouds = document.querySelector('.addclouds')
const MobileviewImg = document.querySelector('.inner-circle-mobile');
const progressbarname = document.querySelector('.progress-headername-Mobile');

let GetEfficiencyreqBody = {}
const nav__dropdown = document.querySelectorAll('.nav__dropdown');
const CurrentNavbar = document.querySelectorAll('.nav__name');

const MultiSelectoptions = document.querySelectorAll(".Multiselect-container .btn");
let percentageSpan = document.querySelector('.percentage');
let Circularprogresssbar = document.querySelector('.circular-progress');
// select industry
let GetCloudDetailsBasedOnIndustry = { "Industry": "General" };
let htmlMarkup = ''
let counter = 0;

//first api callout on domcontent loaded in which I will get the General Data First
let Data = []

let DataInddustryBasedCloud = [];
//Data = Data.concat(DataInddustryBasedCloud);


//let selectedValues = { "Sales Cloud": [], "Marketing Cloud": [], "Service Cloud": [], "Manufacturing Cloud": [], "Health And Life Science Cloud": [], "Education Cloud": [], "Consumer Goods Cloud": [], "Non Profit Cloud": [], "Financial Services Cloud": [], "Media Cloud": [], "Automotive Cloud": [] }
let isInputValid = false;
let selectedValues = { "SalesforceProducts": {} };
let InactiveOption = '';
let circulardeg = '';
let CurrentPage = 'Company Name';
let IndustryValue = '';
let IsAllEmpty = '';
let count = 0;
let Endpagearrsize;
let currentpagecount = 0;
let checkstageornot = false;
let tracklaststagearrsize;
let Previousstagenumber = 0;
let CurrentStageNumber = 0;


let FindpageApi = {
  0: "Company Name",
  1: "Business Industry",
  2: "Company Size",
  3: "Total Revenue",
  4: "Expenditure",
  9: "Salesforce ROI Report"
}
let FindPercentageOfPage = {
  "Company Name": 0,
  "Business Industry": 16,
  "Company Size": 22,
  "Total Revenue": 28,
  "Expenditure": 34,
  "Sales Cloud": 48,
  "Marketing Cloud": 68,
  "Service Cloud": 78,
  "Manufacturing Cloud": 88,
  "Health And Life Science Cloud": 92,
  "Education Cloud": 92,
  "Consumer Goods Cloud": 92,
  "Non Profit Cloud": 92,
  "Financial Services Cloud": 92,
  "Media Cloud": 92,
  "Automotive Cloud": 92,
  "Salesforce ROI Report": 100
}

function HandleGetCloudsDetailsGeneral(Req) {
  //make fetch api callouts;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(Req);
  var body = JSON.stringify({ 'Industry': 'General' })
  var requestOptionsForGeneral = {
    method: "POST",
    headers: myHeaders,
    body: body,
    redirect: "follow"
  };

  var generalCloud = [];

  fetch("http://localhost:3000/get-features", requestOptionsForGeneral)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      generalCloud = result;
      fetchindustrybasedcloud(raw, generalCloud, myHeaders)
    })
    .catch((error) => console.error(error));

  console.log(generalCloud);
}

function fetchindustrybasedcloud(raw, generalCloud, myHeaders) {


  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };


  fetch("http://localhost:3000/get-features", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)

      Data = result;
      Data = generalCloud.concat(Data);
      console.log('all clouds', Data)
      addclouds.innerHTML = '';
      removeoptions();
      Data.forEach((cloud, index) => {
        if (cloud.CloudName === "Sales Cloud") {
          FindpageApi[5] = cloud.CloudName
          AddActivitytimelinequestions(5, FindpageApi[5], cloud.Features, 0, index)
          console.log("You selected Sales Cloud.");
        } else if (cloud.CloudName === "Service Cloud") {
          FindpageApi[6] = cloud.CloudName
          AddActivitytimelinequestions(6, FindpageApi[6], cloud.Features, 1, index)
          console.log("You selected Marketing Cloud.");
        } else if (cloud.CloudName === "Marketing Cloud") {
          FindpageApi[7] = cloud.CloudName;
          AddActivitytimelinequestions(7, FindpageApi[7], cloud.Features, 2, index)
          console.log("You selected Service Cloud.");
        } else {
          FindpageApi[8] = cloud.CloudName;
          AddActivitytimelinequestions(8, FindpageApi[8], cloud.Features, 3, index)
          console.log("You selected Manufacturing Cloud.");
        }

      });
    })
    .catch((error) => console.error(error));
}


let handleMultipleinputs = {};
function handleInputChange(event) {
  if (event.target.dataset.type == "Employees") {


    if (event.target.dataset.for == 'Sales') {

      selectedValues[event.target.dataset.type] = Number(event.target.value) + (handleMultipleinputs['Service'] != undefined ? handleMultipleinputs['Service'] : 0) + (handleMultipleinputs['Marketing'] != undefined ? handleMultipleinputs['Marketing'] : 0) + (handleMultipleinputs['Operation'] != undefined ? handleMultipleinputs['Operation'] : 0)
      handleMultipleinputs[event.target.dataset.for] = Number(event.target.value);
    }
    if (event.target.dataset.for == 'Service') {
      selectedValues[event.target.dataset.type] = Number(event.target.value) + (handleMultipleinputs['Sales'] != undefined ? handleMultipleinputs['Sales'] : 0) + (handleMultipleinputs['Marketing'] != undefined ? handleMultipleinputs['Marketing'] : 0) + (handleMultipleinputs['Operation'] != undefined ? handleMultipleinputs['Operation'] : 0)
      handleMultipleinputs[event.target.dataset.for] = Number(event.target.value);
    }
    if (event.target.dataset.for == 'Marketing') {
      selectedValues[event.target.dataset.type] = Number(event.target.value) + (handleMultipleinputs['Service'] != undefined ? handleMultipleinputs['Service'] : 0) + (handleMultipleinputs['Sales'] != undefined ? handleMultipleinputs['Sales'] : 0) + (handleMultipleinputs['Operation'] != undefined ? handleMultipleinputs['Operation'] : 0)
      handleMultipleinputs[event.target.dataset.for] = Number(event.target.value);
    }
    if (event.target.dataset.for == 'Operation') {
      selectedValues[event.target.dataset.type] = Number(event.target.value) + (handleMultipleinputs['Service'] != undefined ? handleMultipleinputs['Service'] : 0) + (handleMultipleinputs['Marketing'] != undefined ? handleMultipleinputs['Marketing'] : 0) + (handleMultipleinputs['Sales'] != undefined ? handleMultipleinputs['Sales'] : 0)
      handleMultipleinputs[event.target.dataset.for] = Number(event.target.value);
    }
    console.log(selectedValues)
  } else {
    selectedValues[event.target.dataset.type] = event.target.value
    console.log(selectedValues)
  }

}



function AddActivitytimelinequestions(stagenumber, cloudname, Features, selectnumber, index) {
  var newTimelineItem = document.createElement('div');
  newTimelineItem.className = 'timeline-item';
  // Create the inner HTML content for the new timeline item
  newTimelineItem.innerHTML = `
      <div data-page="${cloudname}" data-stage="${stagenumber}" class="timeline-icon"></div>
      <p data-page="${cloudname}" data-stage="${stagenumber}" class="timeline-content">${cloudname}</p>
  `;
  // Append the new timeline item to the 'addclouds' element
  addclouds.appendChild(newTimelineItem);
  Features.forEach(item => {
    for (const [key, value] of Object.entries(item)) {
      var newButtonDiv = document.createElement('div');
      newButtonDiv.className = 'btn info-button-container';
      newButtonDiv.setAttribute('data-value', key);
      // Create the inner HTML content for the new button
      newButtonDiv.innerHTML = `${key}
            <button class="info-button" id="infoButton${counter}">i</button>
        `;
      multiselectContainer[selectnumber].appendChild(newButtonDiv);
      tippy(`#infoButton${counter}`, {
        content: value,
      });
      counter += 1;
    }
  });

  if (stagenumber == 8) {
    console.log(cloudname)
    removeEventListeners('.timeline-icon');
    removeEventListeners('.timeline-content');

    let timelineicons = document.querySelectorAll('.timeline-icon')
    let Timelinescontents = document.querySelectorAll('.timeline-content')
    Timelineitem = document.querySelectorAll(".timeline-item");
    AttachmentEventTimelines(timelineicons);
    //change
    AttachmentEventTimelines(Timelinescontents);
    Attachtmultiselectoptionsevent();
  }


  function Attachtmultiselectoptionsevent() {
    const MultiSelectoptions = document.querySelectorAll(".Multiselect-container .btn");
    MultiSelectoptions.forEach(options => {
      options.addEventListener('click', function () {
        if (!selectedValues.SalesforceProducts[CurrentPage]) {
          selectedValues.SalesforceProducts[CurrentPage] = [];
        }
        const value = options.getAttribute('data-value');
        if (options.classList.contains('selected')) {
          options.classList.remove('selected');
          selectedValues.SalesforceProducts[CurrentPage] = selectedValues.SalesforceProducts[CurrentPage].filter(selected => selected !== value);
        } else {
          options.classList.add('selected');
          selectedValues.SalesforceProducts[CurrentPage].push(value);
        }
        console.log('Selected Values:', selectedValues);
      });
    });
  }
}
AttachmentEventTimelines(Timelines)
AttachmentEventTimelines(Timelinescontent)


function AttachmentEventTimelines(Timelines) {
  Timelines.forEach(function (CurrentTimeline) {
    CurrentTimeline.addEventListener('click', function (event) {
      event.stopPropagation();
      HandleTimeLineProcess(event)
    });
  });
}

function HandleTimeLineProcess(event) {
  if (Number(event.target.dataset.stage) <= currentpagecount + 1) {
    if (Endpagearrsize > tracklaststagearrsize) {
      console.log('current page', CurrentPage)
      checktimelineinputes(CurrentPage);
    }
    CurrentStageNumber = Number(event.target.dataset.stage);
    handleactivitytimeline()
  }
}

function removeEventListeners(classname) {
  document.querySelectorAll(classname).forEach(function (container) {
    container.removeEventListener('click', container);
  });
}

function removeoptions() {
  multiselectContainer.forEach((item, index) => {
    item.innerHTML = '';
  });
}

function createreqbodyefficiency(type, input) {
  selectedValues[type] = input;
}

Nextbutton.forEach(function (nextbtn) {
  nextbtn.addEventListener('click', function (e) {
    checkallNextpages(Number(e.target.dataset.count));
  });
});


function checkallNextpages(pagenumber) {
  if (CurrentPage == "Company Name") {
    isInputValueNotEmpty(GetCompanyName.value, 0);
    if (isInputValid) {
      createreqbodyefficiency("CompanyName", GetCompanyName.value)
    }
  }
  else if (CurrentPage === 'Business Industry') {
    checkstageornot = true
    console.log(checkstageornot)
    isInputValueNotEmpty(IndustryValue, pagenumber);
    if (isInputValid) {
      createreqbodyefficiency("BusinessIndustry", IndustryValue);
      handleprogress("Company", "./Assests/img/Company.png")
    }
  } else if (CurrentPage === 'Company Size') {
    IsAllEmpty = SalesTeamSize.value || MarketingTeamSize.value || SupportTeamSize.value || OperationTeamSize.value
    isInputValueNotEmpty(IsAllEmpty, pagenumber);
    if (isInputValid) {
      createreqbodyefficiency("Employees", Number(SalesTeamSize.value) + Number(MarketingTeamSize.value) + Number(SupportTeamSize.value) + Number(OperationTeamSize.value));
      handledropdown(0)
      handleprogress("Revenue", "./Assests/img/Revenue.png")
    }
  } else if (CurrentPage === 'Total Revenue') {
    isInputValueNotEmpty(TotalRevenue.value, pagenumber);
    if (isInputValid) {
      createreqbodyefficiency("CurrentRevenue", TotalRevenue.value)
    }
  }
  else if (CurrentPage === 'Expenditure') {
    IsAllEmpty = Sales.value || Marketing.value || Support.value || Operation.value;
    let salesVal = (Sales.value && !isNaN(Sales.value)) ? Number(Sales.value) : 0;
    let marketingVal = (Marketing.value && !isNaN(Marketing.value)) ? Number(Marketing.value) : 0;
    let supportVal = (Support.value && !isNaN(Support.value)) ? Number(Support.value) : 0;
    let OperationVal = (Operation.value && !isNaN(Operation.value)) ? Number(Operation.value) : 0;
    console.log(salesVal + marketingVal + supportVal + OperationVal);
    if ((salesVal + marketingVal + supportVal + OperationVal) != 100) {
      document.getElementById('expenditureError').innerHTML = 'Oops! The sum of all fields must equal 100%. Please review your entries and ensure they add up correctly.'
    }
    else {
      isInputValueNotEmpty(IsAllEmpty, pagenumber);
      if (isInputValid) {
        handledropdown(1)
        handleprogress("Platform", "./Assests/img/Platform.png")
      }
    }
  }
  else if (CurrentPage === 'Sales Cloud') {
    try {
      isInputValueNotEmpty(selectedValues.SalesforceProducts[CurrentPage][0], pagenumber);
   
    } catch (error) {
      isInputValueNotEmpty(undefined, pagenumber);

    }
  }
  else if (CurrentPage === 'Marketing Cloud') {
    isInputValueNotEmpty(selectedValues.SalesforceProducts[CurrentPage][0], pagenumber);
  }
  else if (CurrentPage === 'Service Cloud') {
    isInputValueNotEmpty(selectedValues.SalesforceProducts[CurrentPage][0], pagenumber);
  }
  else {
    isInputValueNotEmpty(selectedValues.SalesforceProducts[CurrentPage][0], pagenumber);
    if (isInputValid) {
      handledropdown(2)
      FetchEfficiency()
    }
  }
}



Previousbutton.forEach(function (Previousbutton) {
  Previousbutton.addEventListener('click', function () {
    console.log('clicked')
    debugger
    checkallPreviouspages()

    handlepages('GoToPreviousPage')
  })
})

function checkallPreviouspages() {
  if (CurrentPage === 'Business Industry') {
    count = 0
  } else if (CurrentPage === 'Company Size') {
    count = 1;
  } else if (CurrentPage === 'Total Revenue') {
    handleprogress("Company", "./Assests/img/Company.png")
    count = 2;
  } else if (CurrentPage === 'Expenditure') {
    count = 3;
  } else if (CurrentPage === 'Sales Cloud') {
    handleprogress("Revenue", "./Assests/img/Revenue.png")
    count = 4;
  } else if (CurrentPage === 'Service Cloud') {
    count = 5;
  }
  else if (CurrentPage === 'Marketing Cloud') {
    count = 6;
  } else {
    count = 7;
    handleprogress("Platform", "./Assests/img/Platform.png")
  }

}



function isInputValueNotEmpty(inputValue, pagenumber) {
  if (inputValue == undefined) {
    isInputValid = false;
  } else {
    isInputValid = inputValue.trim() !== '';
  }
  if (!isInputValid) {
    ErrorFields[pagenumber].textContent = 'The field is required or the input format is incorrect.';
    console.log(count)
  }
  else {
    if (pagenumber >= currentpagecount) {
      currentpagecount = pagenumber;
    }
    count = pagenumber;
    handlepages('GoToNextPage');
  }
}



function handlepages(buttonIdentifier) {
  if (buttonIdentifier == 'GoToNextPage') {
    ErrorFields[count].textContent = '';
    Container[count].classList.add('containernone');
    Timelineitem[count].classList.remove('active');
    Timelineitem[count + 1].classList.add('active');
    Container[count + 1].classList.remove('containernone');
    tracklaststagearrsize = count + 1;
    Endpagearrsize = count + 1;
    CurrentPage = FindpageApi[count + 1];
    circulardeg = Number(FindPercentageOfPage[CurrentPage]) * 3.61111111111
    Circularprogresssbar.style.background = `conic-gradient(#e76f51 ${circulardeg}deg, #f0f0f0 12deg)`;
    percentageSpan.textContent = Number(FindPercentageOfPage[CurrentPage]) + '%'

  } else if (buttonIdentifier == 'GoToPreviousPage') {
    ErrorFields[count + 1].textContent = '';
    Container[count + 1].classList.add('containernone');
    Timelineitem[count + 1].classList.remove('active');
    Timelineitem[count].classList.add('active');
    Container[count].classList.remove('containernone');
    tracklaststagearrsize = count
    CurrentPage = FindpageApi[count];
  }
}

function handleactivitytimeline() {
  ErrorFields[tracklaststagearrsize].textContent = '';
  Container[tracklaststagearrsize].classList.add('containernone');
  Timelineitem[tracklaststagearrsize].classList.remove('active');
  Timelineitem[CurrentStageNumber].classList.add('active');
  Container[CurrentStageNumber].classList.remove('containernone');
  tracklaststagearrsize = CurrentStageNumber;
  CurrentPage = FindpageApi[CurrentStageNumber];
}

function handledropdown(dropdownNumber) {
  nav__dropdown[dropdownNumber + 1]?.children[0]?.classList?.add('activedropdown')
  nav__dropdown[dropdownNumber + 1]?.children[1]?.classList?.add('dropdown_active')
}





//work in mobile view
function handleprogress(msg, imgsrc) {
  const computedStyle = getComputedStyle(MobileviewImg);
  // Check if the background property contains the conic-gradient
  if (!computedStyle.backgroundImage.includes('none')) {
    progressbarname.textContent = msg
    MobileviewImg.style.backgroundImage = `url('${imgsrc}')`;
  }
}

Option.forEach(function (option) {
  option.addEventListener('click', function (event) {

    IndustryValue = event.currentTarget.children[1].innerText;
    GetCloudDetailsBasedOnIndustry['Industry'] = IndustryValue;

    console.log('Selected Industry', IndustryValue);
    HandleGetCloudsDetailsGeneral(GetCloudDetailsBasedOnIndustry);
    if (InactiveOption !== '') {
      InactiveOption.classList.remove('optionactive');
    }
    event.currentTarget.classList.add('optionactive');
    InactiveOption = event.currentTarget;
  });
});






function checktimelineinputes(CurrentPage) {
  if (CurrentPage === 'Business Industry') {
    CheckInputValidityTimeline(IndustryValue);
  } else if (CurrentPage === 'Company Size') {
    IsAllEmpty = SalesTeamSize.value || MarketingTeamSize.value || SupportTeamSize.value || OperationTeamSize.value
  } else if (CurrentPage === 'Total Revenue') {
    CheckInputValidityTimeline(TotalRevenue.value);
  }
  else if (CurrentPage === 'Expenditure') {
    IsAllEmpty = Sales.value || Marketing.value || Support.value || Operation.value;
    let salesVal = (Sales.value && !isNaN(Sales.value)) ? Number(Sales.value) : 0;
    let marketingVal = (Marketing.value && !isNaN(Marketing.value)) ? Number(Marketing.value) : 0;
    let supportVal = (Support.value && !isNaN(Support.value)) ? Number(Support.value) : 0;
    let OperationVal = (Operation.value && !isNaN(Operation.value)) ? Number(Operation.value) : 0;
    console.log(salesVal + marketingVal + supportVal + OperationVal);
    if ((salesVal + marketingVal + supportVal + OperationVal) != 100) {
      document.getElementById('expenditureError').innerHTML = 'Oops! The sum of all fields must equal 100%. Please review your entries and ensure they add up correctly.'
    }
  }
  else if (CurrentPage === 'Sales Cloud') {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  }
  else if (CurrentPage === 'Marketing Cloud') {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  }
  else if (CurrentPage === 'Service Cloud') {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  }
  else if (CurrentPage === 'Manufacturing Cloud') {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  } else if (CurrentPage === 'Health And Life Science Cloud') {

    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  } else if (CurrentPage === 'Education Cloud') {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  } else if (CurrentPage === "Consumer Goods Cloud") {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  } else if (CurrentPage === "Non Profit Cloud") {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  } else if (CurrentPage == "Financial Services Cloud") {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  } else if (CurrentPage == "Automotive Cloud") {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  } else if (CurrentPage == "Automotive Cloud") {
    CheckInputValidityTimeline(selectedValues.SalesforceProducts[CurrentPage][0]);
  }
  else {
    CheckInputValidityTimeline(GetCompanyName.value);
  }
}

var efficiency;
function FetchEfficiency() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  console.log();
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(selectedValues),
    redirect: "follow"
  };

  fetch("http://localhost:3000/get-efficiency", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log('result -->', result.Efficiency);
      efficiency = result.Efficiency;
    })
    .catch((error) => console.error(error));
}

function CheckInputValidityTimeline(inputValue) {
  if (inputValue == undefined) {
    isInputValid = false;
  } else {
    isInputValid = inputValue.trim() !== '';
  }
  if (!isInputValid) {
    console.log('value not avalable')
    ErrorFields[CurrentStageNumber].textContent = 'The field is required or the input format is incorrect.';
    throw "The field is required or the input format is incorrect."

  }
}


function viewReport() {
  console.log(selectedValues);

  window.open(`newReport.html?currentRevenue=${selectedValues['CurrentRevenue']}&efficiency=${efficiency}`, '_blank');

}