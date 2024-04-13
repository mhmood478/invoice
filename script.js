// numbers to words 

function main (){
    if (bzz.value<=0) { 

        if (ntw.value <=0) {
            
        }

        else {
            
            var fraction = document.getElementById("txt").value.split(".");
            var fractionx = document.getElementById("biza").value.split(".");
        
            if (fraction.length == 2){
                document.getElementById ("demo").innerHTML =  tafqeet (fraction[0]) + " فاصلة " + tafqeet (fraction[1]);
            }
            else if (fraction.length == 1){
                document.getElementById ("demo").innerHTML =  tafqeet (fraction[0]) + ' ريال عماني فقط '  ;
            }

        }

    } else {

        var fraction = document.getElementById("txt").value.split(".");
        var fractionx = document.getElementById("biza").value.split(".");
    
        if (fraction.length == 2){
            document.getElementById ("demo").innerHTML =  tafqeet (fraction[0]) + " فاصلة " + tafqeet (fraction[1]);
        }
        else if (fraction.length == 1){
            document.getElementById ("demo").innerHTML =  tafqeet (fraction[0]) + ' ريال ' + ' و ' + tafqeet (fractionx[0]) + ' بيسة فقط ';
        }


    }


}



const invoiceTable = document.getElementById('invoice');
const totalAmountElement = document.getElementById('total-amount');
const ntw = document.getElementById('txt');
const bzz = document.getElementById('biza');
const cellX = document.getElementById("tot").rows[0].cells[1];
const celly = document.getElementById("tot").rows[0].cells[2];

function calculateTotal() {
    let totalThousands = 0;
    let totalOnes = 0;

    const rows = invoiceTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const quantity = parseInt(rows[i].getElementsByTagName('td')[2].innerText);
        const rateThousands = parseFloat(rows[i].getElementsByTagName('td')[3].innerText);
        const rateOnes = parseFloat(rows[i].getElementsByTagName('td')[4].innerText);

        let amountThousands = quantity * rateThousands;
        let amountOnes = quantity * rateOnes;

        if (amountOnes >= 1000) {
            const additionalThousands = Math.floor(amountOnes / 1000);
            amountThousands += additionalThousands;
            amountOnes %= 1000;
        }

        totalThousands += amountThousands;
        totalOnes += amountOnes;

        rows[i].getElementsByTagName('td')[5].innerText = amountThousands;
        rows[i].getElementsByTagName('td')[6].innerText = amountOnes;
    }

    // Convert excess ones to thousands
    if (totalOnes >= 1000) {
        const additionalThousands = Math.floor(totalOnes / 1000);
        totalThousands += additionalThousands;
        totalOnes %= 1000;
    }
    
    // Calculate total amount in ones and then convert to thousands if necessary
    let totalAmount = totalThousands * 1000 + totalOnes;
    
    cellX.innerText = totalThousands;
    celly.innerText = totalOnes;
    totalAmountElement.innerText = totalAmount;
    ntw.value = totalThousands;
    bzz.value = totalOnes;


    main();
}

calculateTotal();



    function deleteRow(row) {
        row.remove();
        calculateTotal();
    }

    invoiceTable.addEventListener('input', function(event) {
        const target = event.target;
        if (target.tagName === 'TD' && target.contentEditable === 'true') {
            calculateTotal();
        }
    });

    invoiceTable.addEventListener('mouseover', function(event) {
        const target = event.target;
        if (target.tagName === 'TD' && target.parentElement.rowIndex !== 0 && target.cellIndex === 0) {
            target.innerHTML = '&#10060;';
            target.classList.add('delete-item');
        }
    });

    invoiceTable.addEventListener('mouseout', function(event) {
        const target = event.target;
        if (target.tagName === 'TD' && target.parentElement.rowIndex !== 0 && target.cellIndex === 0) {
            target.innerHTML = target.parentElement.rowIndex;
            target.classList.remove('delete-item');
        }
    });

    invoiceTable.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('delete-item')) {
            deleteRow(target.parentElement);
        }
    });

    
 document.addEventListener('DOMContentLoaded', function () {
        // Function to add event listener for focus
        function addFocusListener(cell) {
            cell.addEventListener('focus', function () {
                // Highlight the text content when the cell gains focus
                const range = document.createRange();
                range.selectNodeContents(this);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            });
        }

        // Add focus event listener to initial editable cells
        const editableCells = document.querySelectorAll('td[contenteditable="true"]');
        editableCells.forEach(addFocusListener);

        // Add event listener to add new rows
        document.getElementById('add-item').addEventListener('click', function () {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${document.querySelectorAll('#invoice tbody tr').length + 1}</td>
                <td contenteditable="true">New Item</td>
                <td contenteditable="true">1</td>
                <td contenteditable="true">10</td>
                <td contenteditable="true">10</td>
                <td>10</td>
                <td>10</td>
            `;
            document.querySelector('#invoice tbody').appendChild(newRow);

            // Add focus event listener to new editable cells
            const newEditableCells = newRow.querySelectorAll('td[contenteditable="true"]');
            newEditableCells.forEach(addFocusListener);
           calculateTotal();

        });
    });