document.getElementById('simulateBtn').addEventListener('click', simulate);

function simulate() {
    const algorithm = document.getElementById('algorithm').value;
    const requests = document.getElementById('requests').value.split(',').map(Number);
    const maxDiskSize = parseInt(document.getElementById('maxDiskSize').value);
    const headStart = parseInt(document.getElementById('headStart').value);
    
    let steps = [];
    switch (algorithm) {
        case 'fcfs':
            steps = fcfs(requests, headStart);
            break;
        case 'sstf':
            steps = sstf(requests, headStart);
            break;
        case 'scan':
            steps = scan(requests, headStart, maxDiskSize);
            break;
        case 'cscan':
            steps = cscan(requests, headStart, maxDiskSize);
            break;
        case 'look':
            steps = look(requests, headStart);
            break;
        case 'clook':
            steps = clook(requests, headStart);
            break;
    }

    const totalSeekTime = calculateTotalSeekTime(steps);
    drawSteps(steps, maxDiskSize, totalSeekTime);
}

function fcfs(requests, head) {
    return [head, ...requests];
}

function sstf(requests, head) {
    let steps = [head];
    let pending = [...requests];
    while (pending.length > 0) {
        pending.sort((a, b) => Math.abs(a - head) - Math.abs(b - head));
        let next = pending.shift();
        steps.push(next);
        head = next;
    }
    return steps;
}

function scan(requests, head, maxDiskSize) {
    let steps = [head];
    let left = requests.filter(r => r < head).sort((a, b) => a - b);
    let right = requests.filter(r => r >= head).sort((a, b) => a - b);

    right.forEach(r => steps.push(r));
    steps.push(maxDiskSize); // Go to the end of the disk
    left.reverse().forEach(r => steps.push(r));

    return steps;
}

function cscan(requests, head, maxDiskSize) {
    let steps = [head];
    let left = requests.filter(r => r < head).sort((a, b) => a - b);
    let right = requests.filter(r => r >= head).sort((a, b) => a - b);

    right.forEach(r => steps.push(r));
    steps.push(maxDiskSize); // Go to the end of the disk
    steps.push(0); // Jump to the beginning
    left.forEach(r => steps.push(r));

    return steps;
}

function look(requests, head) {
    let steps = [head];
    let left = requests.filter(r => r < head).sort((a, b) => a - b);
    let right = requests.filter(r => r >= head).sort((a, b) => a - b);

    right.forEach(r => steps.push(r));
    left.reverse().forEach(r => steps.push(r));

    return steps;
}

function clook(requests, head) {
    let steps = [head];
    let left = requests.filter(r => r < head).sort((a, b) => a - b);
    let right = requests.filter(r => r >= head).sort((a, b) => a - b);

    right.forEach(r => steps.push(r));
    steps.push(left[left.length - 1]); // Jump to the smallest value
    left.reverse().forEach(r => steps.push(r));

    return steps;
}

function calculateTotalSeekTime(steps) {
    let totalSeekTime = 0;
    for (let i = 1; i < steps.length; i++) {
        totalSeekTime += Math.abs(steps[i] - steps[i - 1]);
    }
    return totalSeekTime;
}

function drawSteps(steps, maxDiskSize, totalSeekTime) {
    const canvas = document.getElementById('diskCanvas');
    const ctx = canvas.getContext('2d');
    const resultsDiv = document.getElementById('results');

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!steps || steps.length === 0) {
        console.log("No steps provided for drawing.");
        return;
    }

    const radius = 6; // Circle radius
    const diskSize = canvas.width - 40; // Disk size mapped to canvas width
    const stepWidth = diskSize / maxDiskSize; // Scale for user-defined disk size
    const stepHeight = 50; // Distance between each step (y-axis)

    // Adjust canvas height dynamically based on the number of steps
    canvas.height = steps.length * stepHeight + 50; // 50px padding at the bottom

    // Draw reference axis (x-axis for disk size)
    const startX = 20; // 20px padding from the left
    const startY = 30; // 30px padding from the top

    // Draw the x-axis for disk size
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + maxDiskSize * stepWidth, startY);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add x-axis labels (disk positions)
    ctx.font = "12px Arial";
    ctx.fillStyle = "#000";
    for (let i = 0; i <= maxDiskSize; i += Math.ceil(maxDiskSize / 10)) {
        const x = startX + i * stepWidth;
        ctx.fillText(i, x - 10, startY + 20); // Label x-axis
    }

    // Draw path of disk movement
    ctx.beginPath();
    for (let i = 0; i < steps.length; i++) {
        const x = startX + steps[i] * stepWidth;
        const y = startY + i * stepHeight + 40;

        if (i === 0) {
            ctx.moveTo(x, y); // Start path from the initial head position
        } else {
            ctx.lineTo(x, y); // Draw a line for each movement
        }

        // Draw circles at each step
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = i === 0 ? "green" : (i === steps.length - 1 ? "red" : "#ffcc00"); // Green for start, red for end
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();

        // Draw step labels (y-axis labels for each movement)
        ctx.fillText(`Step ${i}`, 10, y + 5); // Label each step on the y-axis
    }

    // Finalize drawing path
    ctx.strokeStyle = "#007bff"; 
    ctx.lineWidth = 2;
    ctx.stroke();

    // Display order of execution and total seek time
    const orderOfExecution = steps.join(' → ');
    resultsDiv.innerHTML = `
        <div><strong>Order of Execution:</strong> ${orderOfExecution}</div>
        <div><strong>Total Seek Time:</strong> ${totalSeekTime}</div>
    `;
}
