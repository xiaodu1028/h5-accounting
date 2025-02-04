document.addEventListener("DOMContentLoaded", () => {
    loadRecords();
});

function saveRecord() {
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value || new Date().toISOString().split("T")[0];
    const note = document.getElementById("note").value;

    if (!amount || !category) {
        alert("请输入金额和分类");
        return;
    }

    const record = { amount, category, date, note };
    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));

    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("note").value = "";

    loadRecords();
}

function loadRecords() {
    const recordsList = document.getElementById("recordsList");
    recordsList.innerHTML = "";
    let records = JSON.parse(localStorage.getItem("records")) || [];

    records.forEach((record, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${record.date} - ${record.category} - ¥${record.amount} <span onclick="deleteRecord(${index})" style="color:red; cursor:pointer;">X</span>`;
        recordsList.appendChild(li);
    });
}

function deleteRecord(index) {
    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
