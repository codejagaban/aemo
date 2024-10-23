async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        const successMessage = document.getElementById("success-message");
        const errorMessage = document.getElementById("error-message");

        if (response.status === 200) {
            successMessage.textContent = "Thank you for your message. We will reply to you shortly!";
            successMessage.classList.remove("display-none");
            errorMessage.classList.add("display-none");
            document.getElementById("service-form").reset();
        } else {
            console.log(response);
            errorMessage.textContent = "Something went wrong! Please try again";
            errorMessage.classList.remove("display-none");
            successMessage.classList.add("display-none");
        }
    } catch (error) {
        console.log(error);
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "An error occurred while submitting the form.";
        errorMessage.classList.remove("display-none");
    }
}
