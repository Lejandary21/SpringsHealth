//Dummy Data is used
if (localStorage. getItem("patients")== null) {
let dummyPatients = [
    { name: "Sarah Doe", year: 13, age: 17, conditions: "Peanut Allergy", contact: "Jane Doe (021 555 0192)" },
    { name: "James Smith", year: 9, age: 14, conditions: "Type 1 Diabetes", contact: "Mark Smith (021 555 8374)" },
    { name: "Aroha Rata", year: 13, age: 18, conditions: "N/A", contact: "Mere Rata (027 555 9931)" },
    { name: "Leo Cheng", year: 10, age: 15, conditions: "Bee Sting Anaphylaxis", contact: "Wei Cheng (021 555 2211)" }
];

localStorage.setItem("patients", JSON.stringify(dummyPatients));

}

let savedData = localStorage.getItem("patients");
let allPatients = JSON.parse(savedData);


window.onload = function() {
    let tableBody = document.getElementById("patient-table-body");
    let newStudentForm = document.getElementById("new-student-form");

    if (tableBody != null) {
        let tableHTML = ""; 
        

        for (let i = 0; i < allPatients.length; i++) {
            let patient = allPatients[i];
            

            tableHTML += "<tr>";
            tableHTML += "<td><span class='patient-name-link' onclick='openModal(" + i + ")'>" + patient.name + "</span></td>";
            tableHTML += "<td>Year " + patient.year + "</td>";
            tableHTML += "<td>" + patient.age + "</td>";
            tableHTML += "<td>" + patient.conditions + "</td>";
            tableHTML += "</tr>";
        }
        
        tableBody.innerHTML = tableHTML;
    }

if (newStudentForm != null) {
    newStudentForm.onsubmit = function(event) {
        event.preventDefault();

        let newName = document.getElementById("student-name").value;
        let newYear = document.getElementById("student-year").value;
        let newAge = document.getElementById("student-age").value;
        let NewConditions = document.getElementById("student-conditions").value;

        if (newAllergies =="") {
            newAllergies = "N/A";
        }
        let newPatient = {
            name: newName,
            year: newYear,
            age: newAge,
            conditions: newConditions,
            contact: "Pending Update" // I added this so the website doesn't break from new entries
        

            };
            allPatients.push(newPatient);
            localStorage.setItem("patients", JSON.stringify(allPatients));

            alert(newName + " has been added to the patient list.");
            newStudentForm.reset();
        };
    }
};


function openModal(index) {
    let patient = dummyPatients[index];
    

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