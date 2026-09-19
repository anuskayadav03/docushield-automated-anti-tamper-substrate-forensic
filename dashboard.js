// ===============================
// CURRENT OFFICER
// ===============================

const officerSession = sessionStorage.getItem("docuShieldOfficer");

if (officerSession) {
    const officer = JSON.parse(officerSession);
    const roleNames = {
        banking: "Banking Verification Officer",
        land: "Land Registration Officer",
        government: "Government Document Verification Officer"
    };
    const profileName = document.querySelector("#profileName");
    const profileInitials = document.querySelector("#profileInitials");
    const profileRole = document.querySelector("#profileRole");

    profileName.firstChild.textContent = `${officer.officerId} `;
    profileInitials.textContent = officer.officerId.slice(0, 2).toUpperCase();
    profileRole.textContent = `${roleNames[officer.role] || "Authorized officer"} · ${officer.organization}`;
}

document.querySelector("#signOut").onclick = () => {
    sessionStorage.removeItem("docuShieldOfficer");
};

// ===============================
// CURRENT TIME (IST)
// ===============================

const currentTime = document.querySelector("#currentTime"), indiaTime = { timeZone: "Asia/Kolkata" };
const updateCurrentTime = () => {
    const now = new Date(), date = now.toLocaleDateString("en-GB", { ...indiaTime, day: "2-digit", month: "short", year: "numeric" }), time = now.toLocaleTimeString("en-GB", { ...indiaTime, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    currentTime.textContent = `${date} · ${time} IST`;
};
updateCurrentTime(); setInterval(updateCurrentTime, 60000);

// ===============================
// NEW SCAN MODAL
// ===============================

const modal = document.querySelector("#modal");

const scanButtons = document.querySelectorAll(".scan-trigger");

scanButtons.forEach((button) => {
    button.onclick = () => {
        modal.classList.add("show");
    };
});

document.querySelector("#close").onclick = () => {
    modal.classList.remove("show");
};

modal.onclick = (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
};


// ===============================
// SEARCH
// ===============================

const search = document.createElement("label");

search.className = "search";

search.innerHTML = ` ⌕
    <input type="text" placeholder="Search case or document">`;

document.querySelector(".top-actions").prepend(search);

const searchInput = search.querySelector("input");

searchInput.oninput = (event) => {

    const searchValue = event.target.value.toLowerCase();

    document.querySelectorAll(".case").forEach((caseItem) => {

        const caseText = caseItem.textContent.toLowerCase();

        if (caseText.includes(searchValue)) {
            caseItem.style.display = "flex";
        } else {
            caseItem.style.display = "none";
        }

    });
};


// ===============================
// CASE REVIEW DRAWER
// ===============================

const drawer = document.createElement("aside");

drawer.className = "drawer";

drawer.innerHTML = `<div class="drawer-head">
        <div>
            <p class="eyebrow">CASE REVIEW</p>
            <h2 id="caseId">DL-2026-0919-0842</h2>
        </div>

        <button id="closeDrawer">
            ×
        </button>
    </div>


    <div class="score">

        <div>
            <span>RISK SCORE</span>

            <b id="caseScore">92</b>

            <em>Critical</em>
        </div>

        <div class="score-ring"></div>

    </div>


    <div class="checks">

        <h3>Forensic checks</h3>

        <p>
            <b class="bad">!</b>
            QR signature does not match issuer record
        </p>

        <p>
            <b class="bad">!</b>
            Substrate pattern inconsistent with original stock
        </p>

        <p>
            <b class="good">✓</b>
            Face match passed liveness threshold
        </p>

        <p>
            <b class="good">✓</b>
            Registry extract located
        </p>

    </div>


    <div class="drawer-actions">

        <button
            class="secondary"
            id="hold"
        >
            Place on hold
        </button>

        <button
            class="primary"
            id="escalate"
        >
            Escalate case
        </button>

    </div>
`;

document.body.append(drawer);


// ===============================
// TOAST NOTIFICATION
// ===============================

const toast = document.createElement("div");

toast.className = "toast";

document.body.append(toast);


const notify = (message) => {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);

};


// ===============================
// CASE SELECTION
// ===============================

const cases = document.querySelectorAll(".case");

cases.forEach((caseItem) => {

    caseItem.onclick = () => {

        // Remove selected state
        cases.forEach((item) => {
            item.classList.remove("selected");
        });

        // Add selected state
        caseItem.classList.add("selected");


        // Get case ID
        const caseId =
            caseItem.querySelector("span b").textContent;


        // Get risk score
        const caseScore =
            caseItem.querySelector("em i").textContent;


        // Update drawer
        document.querySelector("#caseId").textContent = caseId;

        document.querySelector("#caseScore").textContent = caseScore;


        // Open drawer
        drawer.classList.add("show");

    };

});


// ===============================
// CLOSE CASE DRAWER
// ===============================

document.querySelector("#closeDrawer").onclick = () => {
    drawer.classList.remove("show");
};


// ===============================
// PLACE CASE ON HOLD
// ===============================

document.querySelector("#hold").onclick = () => {

    drawer.classList.remove("show");

    notify("Case placed on hold.");

};


// ===============================
// ESCALATE CASE
// ===============================

document.querySelector("#escalate").onclick = () => {

    drawer.classList.remove("show");

    notify(
        "Case escalated to regional investigation team."
    );

};


// ===============================
// FILE UPLOAD
// ===============================

const uploadButton =
    document.querySelector(".dialog > div button:first-child");

const scannerButton =
    document.querySelector(".dialog > div button:last-child");


const fileInput = document.createElement("input");

fileInput.type = "file";

fileInput.accept = "image/*,.pdf";

fileInput.hidden = true;

document.body.append(fileInput);


// Open file picker
uploadButton.onclick = () => {
    fileInput.click();
};


// ===============================
// SCANNER
// ===============================

scannerButton.onclick = () => { 
    notify(
        "Scanner connection ready — awaiting capture."
    );

};


// ===============================
// FILE SELECTED
// ===============================

fileInput.onchange = () => {

    if (fileInput.files[0]) {

        notify(
            `${fileInput.files[0].name} queued for forensic analysis.`
        );

    }

};
