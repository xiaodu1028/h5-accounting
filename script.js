document.addEventListener("DOMContentLoaded", () => {
    loadRecords();
});

function saveRecord() {
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value || new Date().toISOString().split("T")[0];
    const note = document.getElementById("note").value;

    // 检查金额和分类是否填写
    if (!amount || !category) {
        alert("请输入金额和分类");
        return;
    }

    const record = { amount, category, date, note };
    
    // 获取现有记录，若没有则初始化为空数组
    let records = JSON.parse(localStorage.getItem("records")) || [];

    // 将新记录加入现有记录数组
    records.push(record);

    // 将记录存入本地存储
    localStorage.setItem("records", JSON.stringify(records));

    // 清空输入框
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("note").value = "";

    // 重新加载记录列表
    loadRecords();
}

function loadRecords() {
    const recordsList = document.getElementById("recordsList");
    recordsList.innerHTML = ""; // 清空现有列表
    let records = JSON.parse(localStorage.getItem("records")) || []; // 获取存储的记录

    records.forEach((record, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${record.date} - ${record.category} - ¥${record.amount} <span onclick="deleteRecord(${index})" style="color:red; cursor:pointer;">X</span>`;
        recordsList.appendChild(li);
    });
}

function deleteRecord(index) {
    // 获取现有记录，移除指定项并更新存储
    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));

    // 重新加载记录列表
    loadRecords();
}
