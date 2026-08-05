//Dummy Data is used
let dummyPatients = [
    { name: "Sarah Doe", year: 13, age: 17, conditions: "Peanut Allergy", contact: "Jane Doe (021 555 0192)" },
    { name: "James Smith", year: 9, age: 14, conditions: "Type 1 Diabetes", contact: "Mark Smith (021 555 8374)" },
    { name: "Aroha Rata", year: 13, age: 18, conditions: "N/A", contact: "Mere Rata (027 555 9931)" },
    { name: "Leo Cheng", year: 10, age: 15, conditions: "Bee Sting Anaphylaxis", contact: "Wei Cheng (021 555 2211)" }
];


window.onload = function() {
    let tableBody = document.getElementById("patient-table-body");
    

    if (tableBody != null) {
        let tableHTML = ""; 
        

        for (let i = 0; i < dummyPatients.length; i++) {
            let patient = dummyPatients[i];
            

            tableHTML += "<tr>";
            tableHTML += "<td><span class='patient-name-link' onclick='openModal(" + i + ")'>" + patient.name + "</span></td>";
            tableHTML += "<td>Year " + patient.year + "</td>";
            tableHTML += "<td>" + patient.age + "</td>";
            tableHTML += "<td>" + patient.conditions + "</td>";
            tableHTML += "</tr>";
        }
        

        tableBody.innerHTML = tableHTML;
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