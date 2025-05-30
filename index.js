let userform = document.getElementById("user-form");
if (!localStorage.getItem("user-entries")) {
    localStorage.setItem("user-entries", JSON.stringify([]));
}
const retriveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    }
    else {
        entries = [];
    }
    return entries;
}

let userEntries = retriveEntries();

const displayEntries = () => {
    const entries = retriveEntries();
    const entriesBody = document.getElementById("entries-body");
    entriesBody.innerHTML = "";

    if (entries.length > 0) {
        const tableEntries = entries.map((entry) => {
            const nameCell = `<td>${entry.name}</td>`;
            const emailCell = `<td>${entry.email}</td>`;
            const passwordCell = `<td>${entry.password}</td>`;
            const dobCell = `<td>${entry.dob}</td>`;
            const acceptCell = `<td>${entry.acceptForm}</td>`;

            return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptCell}</tr>`;
        }).join("\n");

        entriesBody.innerHTML = tableEntries;
    }
}

const validateDOB = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
};

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById("email").value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptForm = document.getElementById("acceptTerms").checked;

    if (!validateDOB(dob)) {
        alert("Date of Birth must be between 18 and 55 years old");
        dobInput.classList.add('is-invalid');
        document.getElementById('dob-error').style.display = 'block';
        document.getElementById('dob').focus();
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptForm
    };
    userEntries = retriveEntries();
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    userform.reset();
}

displayEntries();
userform.addEventListener("submit", saveUserForm);
