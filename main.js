// //유저가 값을 입력한다
// // + 버튼을 클릭하면, 할일이 추가된다
// // delete 버튼을 누르면 할일이 삭제된다
// // check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// //1. check 버튼을 클릭하는 순간 true false
// //2. true이면 끝난걸로 간주하고 밑줄 보여주기
// //3. false이면 안끝난걸로 간주하고 그대로 
// // 진행중 끝남 탭을 누르면, 언더바가 이동한다
// // 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// // 전체탭을 누르면 다시 전체아이템으로 돌아옴

    

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

tabs.forEach(tab => {
    tab.addEventListener("click", function (event) {
        moveUnderLine(event.target);
        filter(event);
    });
});

// 🚀 언더라인 이동 함수
function moveUnderLine(target) {
    underLine.style.left = target.offsetLeft + "px";
    underLine.style.width = target.offsetWidth + "px";
}

// 🚀 할 일 추가
function addTask() {
    let taskContent = taskInput.value.trim();
    if (taskContent === "") {
        alert("📝 할 일을 입력하세요!");
        return;
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskContent,
        isComplete: false
    };

    taskList.push(task);
    taskInput.value = "";
    render();
}

// 🚀 화면 렌더링
function render() {
    let resultHTML = "";
    let list = mode === "all" ? taskList : filterList;

    for (let i = 0; i < list.length; i++) {
        let task = list[i];
        let background = task.isComplete ? 'style="background-color: #efefef;"' : "";
        let buttonText = task.isComplete ? "🔄 되돌리기" : "✔ 체크";
        let buttonClass = task.isComplete ? "undo-btn" : "check-btn";

        resultHTML += `
        <div class="task" ${background}>
            <div class="${task.isComplete ? "task-done" : ""}">${task.taskContent}</div>
            <div>
                <button class="${buttonClass}" onClick="toggleComplete('${task.id}')">${buttonText}</button>
                <button onClick="deleteTask('${task.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`;
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

// 🚀 체크 / 되돌리기 기능
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    updateFilterList();
    render();
}

// 🚀 할 일 삭제
function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    updateFilterList();
    render();
}

// 🚀 필터링 업데이트
function updateFilterList() {
    if (mode === "all") {
        filterList = [...taskList];
    } else if (mode === "ongoing") {
        filterList = taskList.filter(task => !task.isComplete);
    } else if (mode === "done") {
        filterList = taskList.filter(task => task.isComplete);
    }
}

// 🚀 필터 기능
function filter(event) {
    mode = event.target.id;
    tabs.forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");
    updateFilterList();
    render();
}

// 🚀 랜덤 ID 생성
function randomIDGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

// 🔥 초기 언더라인 위치 설정 (첫 번째 탭)
document.addEventListener("DOMContentLoaded", function () {
    let activeTab = document.querySelector(".task-tabs .active");
    moveUnderLine(activeTab);
});
