/**
 * Static Website Form Integration Agent
 * 
 * Goal: Integrate all website forms with DigiTech Forms API.
 * Rules:
 * - Scan for <form> elements.
 * - Prevent default submission.
 * - Collect FormData.
 * - Submit JSON to API.
 * - Handle UI feedback (loading, success, error).
 */

(function () {
    const API_ENDPOINT = "https://forms.thedigitechsolutions.com/api/forms/submit/0bc30797-7a99-4b68-a7c9-9a7852e9c65c";

    /**
     * Initialize form handler on DOMContentLoaded
     */
    document.addEventListener("DOMContentLoaded", () => {
        // Select all forms, excluding known search forms if any
        const forms = document.querySelectorAll('form:not(#search-form)');

        if (forms.length === 0) {
            console.log("Form Integration: No forms found on this page.");
            return;
        }

        console.log(`Form Integration: Found ${forms.length} form(s). Attaching handlers...`);

        forms.forEach(form => {
            attachFormHandler(form);
        });
    });

    /**
     * Attaches submit event listener to a form
     * @param {HTMLFormElement} form 
     */
    function attachFormHandler(form) {
        // Remove any inline onsubmit attributes to verify cleaner control (optional but good practice)
        form.removeAttribute('onsubmit');

        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Clear previous messages
            clearMessages(form);

            // UI Indicators: Loading
            const submitBtn = form.querySelector('[type="submit"], button:not([type="button"])');
            let originalBtnText = "";
            if (submitBtn) {
                originalBtnText = submitBtn.innerText;
                submitBtn.innerText = "Sending...";
                submitBtn.disabled = true;
                submitBtn.classList.add("is-disabled"); // theme util
            }

            try {
                // Collect Data
                const formData = new FormData(form);
                const payload = Object.fromEntries(formData.entries());

                // Send API Request
                const response = await fetch(API_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();

                // Success Handling
                console.log("Form submitted successfully:", result);
                showFeedback(form, "success", "Message sent successfully! We will contact you soon.");
                form.reset();

            } catch (error) {
                console.error("Form submission failed:", error);
                showFeedback(form, "error", "Submission failed. Please try again later.");
            } finally {
                // Reset Button
                if (submitBtn) {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove("is-disabled");
                }
            }
        });
    }

    /**
     * Show success/error message in the form
     * @param {HTMLFormElement} form 
     * @param {'success'|'error'} type 
     * @param {string} message 
     */
    function showFeedback(form, type, message) {
        // Check if a message container already exists
        let msgContainer = form.querySelector(".form-feedback-message");

        if (!msgContainer) {
            msgContainer = document.createElement("div");
            msgContainer.className = "form-feedback-message";
            msgContainer.style.marginTop = "15px";
            msgContainer.style.padding = "10px";
            msgContainer.style.borderRadius = "5px";
            msgContainer.style.fontSize = "14px";
            msgContainer.style.fontWeight = "500";
            // Append at the end of the form
            form.appendChild(msgContainer);
        }

        // Style based on type
        if (type === "success") {
            msgContainer.style.color = "#155724";
            msgContainer.style.backgroundColor = "#d4edda";
            msgContainer.style.border = "1px solid #c3e6cb";
        } else {
            msgContainer.style.color = "#721c24";
            msgContainer.style.backgroundColor = "#f8d7da";
            msgContainer.style.border = "1px solid #f5c6cb";
        }

        msgContainer.textContent = message;

        // Auto-dismiss success message after 5 seconds
        if (type === "success") {
            setTimeout(() => {
                msgContainer.remove();
            }, 5000);
        }
    }

    function clearMessages(form) {
        const existing = form.querySelectorAll(".form-feedback-message");
        existing.forEach(el => el.remove());
    }

})();
