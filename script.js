let currentTab="all";
const tabActive= ["bg-navy","border-navy","text-white"];
const tabInactive=["bg-transparent","text-slate-700","border-slate-200"];

const allContainer=document.getElementById("all-container");
const allInterview= document.getElementById("interview-container");
const allRejected= document.getElementById("reject-container");
const emptyJob=b=document.getElementById("empty");
// console.log(allContainer,allInterview,allRejected);

function switchTab(tab) {
    // console.log(tab);
    const tabs= ["all","interview","rejected"];
    currentTab= tab;
    for(const t of tabs){
        const tabeName= document.getElementById("tab-"+t);
        if(t=== tab){
            tabeName.classList.remove(...tabInactive);
            tabeName.classList.add(...tabActive);
        }
        else{
            tabeName.classList.remove(...tabActive);
            tabeName.classList.add(...tabInactive);
        }
        // console.log(tabeName);
    }

    const pages=[allContainer,allInterview,allRejected];
    for(const page of pages){
        page.classList.add("hidden");
    }
    emptyJob.classList.add("hidden");
    if(tab === "all"){
        allContainer.classList.remove("hidden");
        if(allContainer.children.length<1){
            emptyJob.classList.remove("hidden");
        }
    }
    else if(tab === "interview"){
        allInterview.classList.remove("hidden");
        if(allInterview.children.length<1){
            emptyJob.classList.remove("hidden");
        }
        
    }
    else{
        allRejected.classList.remove("hidden");
        if(allRejected.children.length<1){
            emptyJob.classList.remove("hidden");
        }

    }
    stateUpdate();
}

//stat Update 

const totalStat=document.getElementById("stat-total");
const interviewStat= document.getElementById("stat-interview");
const rejectStat=document.getElementById("stat-rejected");
const available= document.getElementById("available");


//console.log(totalStat,interviewStat,rejectStat);

function stateUpdate(){
    // totalStat.innerText=allContainer.children.length;
    // interviewStat.innerText=allInterview.children.length;
    // rejectStat.innerText=allRejected.children.length;

    const counts={
        all:allContainer.children.length,
        interview:allInterview.children.length,
        rejected:allRejected.children.length,

    };
    totalStat.innerText=counts.all;
    interviewStat.innerText=counts.interview;
    rejectStat.innerText=counts.rejected;
    available.innerText=counts[currentTab];

    if(counts[currentTab]<1){
        emptyJob.classList.remove("hidden");
    }
    
}

// function isJob(){
//     if(totalStat.innerText=allContainer.children.length<1){
//         emptyJob.classList.remove("hidden");
//     }
//     if(totalStat.innerText=allInterview.children.length<1){
//         emptyJob.classList.remove("hidden");
//     }
//     if(totalStat.innerText=allRejected.children.length<1){
//         emptyJob.classList.remove("hidden");
//     }
// }





// empty job



document.getElementById("jobs-container").addEventListener("click",function(event){
    const clickedElement=event.target;

    const card= clickedElement.closest(".card");
    const status= document.querySelector(".status");
    const parent=card.parentNode;

    if(clickedElement.classList.contains("interview")){
        status.innerText="INTERVIEWED";
        allInterview.appendChild(card);
        // console.log("Interview Clicked");
        stateUpdate();
    }
    if(clickedElement.classList.contains("reject")){
        status.innerText="REJECTED";
        allRejected.appendChild(card);
        // console.log("Rejected Clicked");
        stateUpdate();
        
    }
    if(clickedElement.classList.contains("delete")){
        // console.log(parent);
        parent.removeChild(card);
        stateUpdate();
        
        
    }
    
    
})
stateUpdate();
switchTab(currentTab);