// ============================================================
// ASURA TALK! - PHASE 1
// Username Entry
// ============================================================


// =========================
// DOM
// =========================

const usernameInput = document.getElementById("usernameInput")
const joinButton = document.getElementById("joinButton")
const joinText = document.getElementById("joinText")
const usernameError = document.getElementById("usernameError")


// =========================
// State
// =========================

let username = ""
let hasJoined = false


// =========================
// Username Validation
// =========================

function validateUsername(username) {

    if (!username) {
        return "Username is required !"
    }

    if (username.length < 3) {
        return "Username must be at least 3 characters !"
    }

    if (username.length > 20) {
        return "Username must be not more than 20 characters !"
    }

    if (!/^[a-zA-Z0-9_ ]+$/.test(username)) {
        return "Only letters, numbers, spaces and _ are allowed !"
    }

    return ""
}


// =========================
// Enter Zone
// =========================

joinButton.addEventListener("click", () => {

    const newUsername = usernameInput.value.trim()

    // Validate username
    const error = validateUsername(newUsername)


    // ❌ Invalid Username
    if (error) {

        usernameError.textContent = error

        usernameInput.classList.add("input-error")

        return
    }


    // ✅ Valid Username

    usernameError.textContent = ""

    usernameInput.classList.remove("input-error")


    // Store username
    username = newUsername

    hasJoined = true


    // Save username for the next page
    localStorage.setItem("username", username)


    // Update UI
    joinText.textContent = `Welcome ${username} !!`

    joinButton.textContent = "Entered ✅"

    usernameInput.disabled = true

    joinButton.disabled = true


    // Go to Room Discovery
    window.location.href = "/rooms.html"

})


// =========================
// Enter Key
// =========================

usernameInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        joinButton.click()

    }

})