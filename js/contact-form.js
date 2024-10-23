document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact_form");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get input field values
        const user_name = document.querySelector('input[name=name]').value;
        const user_email = document.querySelector('input[name=email]').value;
        const user_message = document.querySelector('textarea[name=message]').value;
        const selected_service = document.querySelector('select[name=services]').value;

        // Simple validation
        let proceed = true;
        if (user_name === "") {
            document.querySelector('input[name=name]').style.borderColor = '#e41919';
            proceed = false;
        }
        if (user_email === "") {
            document.querySelector('input[name=email]').style.borderColor = '#e41919';
            proceed = false;
        }
        if (user_message === "") {
            document.querySelector('textarea[name=message]').style.borderColor = '#e41919';
            proceed = false;
        }
        if (selected_service === "") { // Check if a service is selected
            document.querySelector('select[name=services]').style.borderColor = '#e41919';
            proceed = false;
        }

        // Proceed if validation passes
        if (proceed) {
            const formData = {
                access_key: "a0163d58-870e-43f3-9ec8-fa7b8d9c5ab1",
                userName: user_name,
                userEmail: user_email,
                userMessage: user_message,
                selectedService: selected_service,
            };

            try {
                // Send form data using fetch
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                let output = "";

                if (response.status === 200 && result.success) {
                    // Success response
                    output = '<div class="success">Thank you for your message. We will reply to you shortly!</div>';
                    // Reset the form fields
                    form.reset();
                } else {
                    // Error response
                    output = `<div class="error">${result.message || "Something went wrong!"}</div>`;
                }

                // Display the result
                document.getElementById("result").innerHTML = output;
                document.getElementById("result").style.display = "block";
            } catch (error) {
                console.error("Error submitting form:", error);
                const output = '<div class="error">An error occurred while submitting the form. Please try again later.</div>';
                document.getElementById("result").innerHTML = output;
                document.getElementById("result").style.display = "block";
            }
        }

        // Reset border colors on keyup
        document.querySelectorAll("#contact_form input, #contact_form textarea, #contact_form select").forEach(input => {
            input.addEventListener("keyup", function () {
                input.style.borderColor = '';
                document.getElementById("result").style.display = "none";
            });
        });
    });
});
