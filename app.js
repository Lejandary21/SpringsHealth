//Dummy Data is used
let allPatients = [];
let savedData = localStorage.getItem("patients");   

if (savedData !== null) {
    try {
        allPatients = JSON.parse(savedData);
    } catch (e) {
        allPatients = []; 
    }
}


if (!Array.isArray(allPatients) || allPatients.length === 0) {
    allPatients = [
    { name: "Sarah Doe", year: 13, age: 17, conditions: "Severe Peanut Allergy", contact: "Jane Doe (021 555 0192)" },
    { name: "James Smith", year: 9, age: 14, conditions: "Type 1 Diabetes", contact: "Mark Smith (021 555 8374)" },
    { name: "Aroha Rata", year: 13, age: 18, conditions: "N/A", contact: "Mere Rata (027 555 9931)" },
    { name: "Leo Cheng", year: 10, age: 15, conditions: "Bee Sting Anaphylaxis", contact: "Wei Cheng (021 555 2211)" }
    ];

    localStorage.setItem("patients", JSON.stringify(allPatients));

}


let isEditMode = false;


window.onload = function() {
    buildTable();
    let newStudentForm = document.getElementById("new-student-form");



if (newStudentForm != null) {
    newStudentForm.onsubmit = function(event) {
        event.preventDefault();

        let newName = document.getElementById("student-name").value;
        let newYear = document.getElementById("student-year").value;
        let newAge = document.getElementById("student-age").value;
        let newConditions = document.getElementById("student-conditions").value;
        let newContact = document.getElementById("student-contact").value;

        if (newConditions =="") {
            newConditions = "N/A";
        }
        let newPatient = {
            name: newName,
            year: newYear,
            age: newAge,
            conditions: newConditions,
            contact: newContact,
        

            };
            allPatients.push(newPatient);
            localStorage.setItem("patients", JSON.stringify(allPatients));

            alert(newName + " has been added to the patient list.");
            newStudentForm.reset();

            buildTable();
        };
    }
};

function buildTable () {
    let tableBody = document.getElementById("patient-table-body");

    if (tableBody == null) {
        return;
    }

    let tableHTML = "";
        
        for (let i = 0; i < allPatients.length; i++) {
            let patient = allPatients[i];

            tableHTML += "<tr>";

            if (isEditMode) {
                tableHTML += "<td><input type='text' value=\"" + patient.name + "\" onchange='updateData(" + i + ", \"name\", this.value)'></td>";
                tableHTML += "<td><input type='number' value=\"" + patient.year + "\" onchange='updateData(" + i + ", \"year\", this.value)'></td>";
                tableHTML += "<td><input type='number' value=\"" + patient.age + "\" onchange='updateData(" + i + ", \"age\", this.value)'></td>";
                tableHTML += "<td><input type='text' value=\"" + patient.conditions + "\" onchange='updateData(" + i + ", \"conditions\", this.value)'></td>";
                tableHTML += "<td><input type='text' value=\"" + patient.contact + "\" onchange='updateData(" + i + ", \"contact\", this.value)'></td>";
                tableHTML += "<td><button onclick='deletePatient(" + i + ")'>Delete</button></td>";

            } else {
                tableHTML += "<td><span class='patient-name-link' onclick='openModal(" + i + ")'>" + patient.name + "</span></td>";
                tableHTML += "<td>" + patient.year + "</td>";
                tableHTML += "<td>" + patient.age + "</td>";
                tableHTML += "<td>" + patient.conditions + "</td>";
                tableHTML += "<td>" + patient.contact + "</td>";
            }
            
            tableHTML += "</tr>";
        }
        tableBody.innerHTML = tableHTML;
    }

function toggleEditMode() {
    isEditMode = !isEditMode;

    let btn = document.getElementById("edit-table-btn");
    let actionHeader = document.getElementById("action-header");

    if (isEditMode) {
        btn.innerText = "Cancel";
        btn.style.backgroundColor = "#e74c3c";
        btn.style.color = "#fff";
        actionHeader.style.display = "table-cell";
    } else {
        btn.innerText = "Edit Patients";
        btn.style.backgroundColor = "";
        btn.style.color = "";
        actionHeader.style.display = "none";
    }
    
    buildTable();
}

function updateData(index, key, newValue) {
    allPatients[index][key] = newValue;
    localStorage.setItem("patients", JSON.stringify(allPatients));
}

function deletePatient(index) {
    if (confirm("Are you sure you want to delete this patient?")) {
        allPatients.splice(index, 1);
        localStorage.setItem("patients", JSON.stringify(allPatients));
        buildTable();
    }
}

function openModal(index) {
    let patient = allPatients[index];
    

    document.getElementById("modal-name").innerText = patient.name;
    document.getElementById("modal-year").innerText = "Year " + patient.year;
    document.getElementById("modal-age").innerText = patient.age;
    document.getElementById("modal-conditions").innerText = patient.conditions;
    document.getElementById("modal-contact").innerText = patient.contact;
    

    document.getElementById("patient-modal").style.display = "flex";
}


function closeModal() {
    document.getElementById("patient-modal").style.display = "none";
}