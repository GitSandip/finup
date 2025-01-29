function calculateSIP() {
    let P = parseFloat(document.getElementById('investment').value) || 0;
    let r = (parseFloat(document.getElementById('rate').value) || 0) / 100 / 12;
    let n = (parseFloat(document.getElementById('duration').value) || 0) * 12;

    if (P <= 0 || r <= 0 || n <= 0) {
        alert("Please enter valid positive values.");
        return;
    }

    let futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    let totalInvested = P * n;
    let totalGains = futureValue - totalInvested;

    document.getElementById('totalInvested').innerText = totalInvested.toFixed(2);
    document.getElementById('maturityValue').innerText = futureValue.toFixed(2);
    document.getElementById('totalGains').innerText = totalGains.toFixed(2);

    drawChart(totalInvested, totalGains);
}

function drawChart(totalInvested, totalGains) {
    let ctx = document.getElementById('sipChart').getContext('2d');
    if (window.sipChart) window.sipChart.destroy();
    window.sipChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Total Investment', 'Total Gains'],
            datasets: [{
                data: [totalInvested, totalGains],
                backgroundColor: ['#007bff', '#28a745']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}
