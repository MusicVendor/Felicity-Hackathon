let currentGate = '';

function selectGate(gate) {
    currentGate = gate;
    
    // Ensure simulation containers are visible for the selected gate
    document.getElementById('and-simulation').style.display = 'none';
    document.getElementById('or-simulation').style.display = 'none';
    document.getElementById('not-simulation').style.display = 'none';
    
    // Show the correct simulation
    document.getElementById(gate.toLowerCase() + '-simulation').style.display = 'block';
    
    // Reset inputs and update output
    const inputA = document.getElementById('inputA-' + gate.toLowerCase());
    inputA.checked = false;
    
    if (gate !== 'NOT') {
        const inputB = document.getElementById('inputB-' + gate.toLowerCase());
        inputB.checked = false;
    }
    
    updateOutput(gate);
}

function updateOutput(gate) {
    // Get the correct input elements based on the gate type
    const inputAId = 'inputA-' + gate.toLowerCase();
    const inputBId = 'inputB-' + gate.toLowerCase();
    const outputId = 'output-' + gate.toLowerCase();
    
    const inputA = document.getElementById(inputAId).checked ? 1 : 0;
    let inputB = 0;
    let output = 0;
    
    if (gate !== 'NOT') {
        inputB = document.getElementById(inputBId).checked ? 1 : 0;
    }
    
    // Logic gate operations
    switch(gate) {
        case 'AND':
            output = inputA && inputB ? 1 : 0;
            break;
        case 'OR':
            output = inputA || inputB ? 1 : 0;
            break;
        case 'NOT':
            output = !inputA ? 1 : 0;
            break;
    }
    
    const outputLED = document.getElementById(outputId);
    if (output) {
        outputLED.classList.add('on');
    } else {
        outputLED.classList.remove('on');
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active button state
    document.querySelectorAll('.sidebar-button button').forEach(button => {
        button.classList.remove('active-button');
    });
    
    // Add active class to the clicked button
    document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('active-button');

    // Auto-select the corresponding gate for gate sections
    if (sectionId === 'and') {
        selectGate('AND');
    } else if (sectionId === 'or') {
        selectGate('OR');
    } else if (sectionId === 'not') {
        selectGate('NOT');
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set the default section
    if (document.querySelector('.section.active') === null) {
        showSection('aim');
    }
    
    // Add click handlers to navigation buttons
    document.querySelectorAll('.navigation-buttons a').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});