// check the local storage for the user entries
function loadLocalUserEntries() {
  let userEntries = localStorage.getItem("user-entries");
  if (userEntries) {
    userEntries = JSON.parse(userEntries);
  } else {
    userEntries = [];
  }
  return userEntries;
}

// Local storage to save the user entries
let userEntries = loadLocalUserEntries();

const displayEntries = () => {
  const savedUserEntries = localStorage.getItem("user-entries");
  let entries = "";
  if (savedUserEntries) {
    const parsedUserEntries = JSON.parse(savedUserEntries);
    entries = parsedUserEntries
      .map((entry, index) => {
        const number = `<td class="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${
          Number(index) + 1
        }.</td>`;
        const name = `<td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.name}</td>`;
        const email = `<td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.email}</td>`;
        const password = `<td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.password}</td>`;
        const dob = `<td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.dob}</td>`;
        const acceptTerms = `<td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.acceptTermsAndConditions}</td>`;
        const row = `<tr class="bg-gray-300 bg-opacity-75 border-b" >${number} ${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
        return row;
      })
      .join("\n");
  }
  ``;
  var table = `${entries}`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const getAge = (dateString) => {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ageValidation = (dateString) => {
  let userAge = getAge(dateString);
  if (userAge < 18 || userAge > 55) {
    errorMessage("age-error", "Age must be between 18 and 55");
    return false;
  }
  return true;
};

const passwordValidation = (password) => {
  if (password.length < 8) {
    errorMessage("password-error", "Password must be at least 8 characters");
    return false;
  } else if (password.search(/[a-z]/i) < 0) {
    errorMessage("password-error", "Password must contain at least one lowercase letter");
    return false;
  } else if (password.search(/[A-Z]/i) < 0) {
    errorMessage("password-error", "Password must contain at least one uppercase letter");
    return false;
  } else if (password.search(/[0-9]/i) < 0) {
    errorMessage("password-error", "Password must contain at least one number");
    return false;
  }
  return true;
};

const errorMessage = (identifier, message) => {
  document.getElementById(identifier).textContent = message;
};

const clearUserForm = () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("acceptTerms").checked = false;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions = document.getElementById("acceptTerms").checked;
  const userDetails = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };

  if (!passwordValidation(password)) return;
  errorMessage("password-error", "");

  if (!ageValidation(dob)) return;
  errorMessage("age-error", "");

  userEntries.push(userDetails);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
  clearUserForm();
  alert("Saved Successfully!!");
};

let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();
