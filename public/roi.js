const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const addExperienceBtn = document.querySelector(".add-exp-btn");
const btnComplete = document.querySelector(".btn-complete");
btnComplete.addEventListener("click", () => {
    document.getElementsByTagName('form').submit
})
let formStepsNum = 0;
let experienceNum = 1;

function updateFormSteps() {

    formSteps.forEach(formStep => {
        formStep.classList.contains("active") &&
        formStep.classList.remove("active");
    })
    formSteps[formStepsNum].classList.add("active");
}

function updateProgressBar() {
    progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
            progressStep.classList.add("active");
        } else {
            progressStep.classList.remove("active");
        }
    })

    const progressActive = document.querySelectorAll(".progress-step.active");
    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + '%';
}

nextBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        formStepsNum++;
        updateFormSteps();
        updateProgressBar();
        console.log("kk")
    })
})

prevBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        formStepsNum--;
        updateFormSteps();
        updateProgressBar();
        console.log("kk")
    })
})

