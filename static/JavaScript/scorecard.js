document.addEventListener('DOMContentLoaded', function() {
    function calculateScore() {
        let businessScore = 0;
        let OSPScore = 0;
        document.querySelectorAll('span[id^="score"]').forEach(function(span) {
            let row = span.closest('tr');
            let rowNumber = Array.from(row.parentNode.children).indexOf(row);
            if (rowNumber >= 0 && rowNumber <= 7) {
                let score = parseFloat(span.textContent);
                if (!isNaN(score)) {
                    businessScore += score;
                }
            } else if ([9,10,11,12].includes(rowNumber)) {
                let score = parseFloat(span.textContent);
                if (!isNaN(score)) {
                    OSPScore += score;
                }
            }
        });
        let finalScore = (businessScore * 0.5) + (OSPScore * 0.5);
        document.getElementById('businessScore').textContent = businessScore.toFixed(2);
        document.getElementById('OSPScore').textContent = OSPScore.toFixed(2);
        document.getElementById('finalScore').textContent = finalScore.toFixed(2);
    }

    document.querySelectorAll('input[type="text"]').forEach(function(input) {
        input.addEventListener('blur', function() {
            let value = this.value.trim();
            let row = this.closest('tr');
            let rowNumber = Array.from(row.parentNode.children).indexOf(row);
            if ((rowNumber === 0 || rowNumber === 1) && value === '') {
                value = '00:00:00';
                this.value = value;
            } else if (rowNumber === 0 || rowNumber === 1) {
                if (!/^([01]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/.test(value)) {
                    // Convert input value to time format (00:00:00)
                    let seconds = parseInt(value);
                    let hours = Math.floor(seconds / 3600);
                    let minutes = Math.floor((seconds % 3600) / 60);
                    let secs = seconds % 60;
                    value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                    this.value = value;
                }
            } else if ([2, 3, 4, 5, 6, 7].includes(rowNumber)) {
                if (value === '') {
                    value = '0.00%';
                } else {
                    value = parseFloat(value).toFixed(2) + '%';
                }
                this.value = value;
            } else if ([9, 10, 11,12].includes(rowNumber)) {
                if (value === '') {
                    value = '0';
                } else {
                    value = parseFloat(value).toFixed(2);
                }
                this.value = value;
            }

            let data = {
                'rowNumber': rowNumber,
                'weightage': parseFloat(row.cells[1].textContent.replace('%', '')), // Remove the percentage sign
                'off_track': row.cells[2].textContent,
                'meet_some_expectations': row.cells[3].textContent,
                'on_track': row.cells[4].textContent,
                'raise_the_bar': row.cells[5].textContent,
                'lead_the_way': row.cells[6].textContent,
                'value': value
            };
            fetch('/calculate_points', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                let points = parseFloat(data.points);
                let weightage = parseFloat(row.cells[1].textContent.replace('%', '')); // Remove the percentage sign
                let score = (points * weightage / 100);
                if (!isNaN(score)) {
                    row.querySelector('span[id^="points"]').textContent = points.toFixed(2);
                    row.querySelector('span[id^="score"]').textContent = score.toFixed(2); // Calculate and display score
                    calculateScore(); // Update total score
                }
            });
        });
    });
});


