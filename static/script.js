async function generatePlan() {

    const response = await fetch("/plan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            destination: document.getElementById("destination").value,
            budget: document.getElementById("budget").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value
        })
    });

    const data = await response.json();

    document.getElementById("result").innerHTML = `
        <h2>✨ Your Travel Plan</h2>
        <p><b>Destination:</b> ${data.destination}</p>
        <p><b>Dates:</b> ${data.dates}</p>

        <h3>🚗 Transport</h3>
        <ul>${data.transportation.map(t => `<li>${t}</li>`).join("")}</ul>

        <h3>🏨 Accommodation</h3>
        <ul>${data.accommodation.map(a => `<li>${a}</li>`).join("")}</ul>

        <h3>🍜 Food</h3>
        <ul>${data.food.map(f => `<li>${f}</li>`).join("")}</ul>

        <h3>🎯 Activities</h3>
        <ul>${data.activities.map(a => `<li>${a}</li>`).join("")}</ul>
    `;
}