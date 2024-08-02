
        // Dummy credentials
        const dummyCredentials = {
            username: 'admin',
            password: 'pass1'
        };

        // Simulated data from the server
        const formDataDB = [
            {
                id: 1,
                name: 'John Doe',
                employeeId: '12345',
                designation: 'Manager',
                department: 'HR',
                amountRequested: 50000,
                amountInWords: 'Fifty Thousand',
                reason: 'Emergency',
                applicantSignature: 'John Doe',
                date: '2024-08-01',
                recoveryAmount: 50000,
                installments: 1,
                payableMonth: '2024-08',
                receivedBy: 'HR Manager',
                accountsApprovalName: 'Jane Smith',
                accountsSignature: 'Jane Smith',
                accountsDate: '2024-08-02',
                notApprovedReasons: ''
            }
            // Add more data as needed
        ];

        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Get the entered username and password
            const enteredUsername = document.getElementById('username').value;
            const enteredPassword = document.getElementById('password').value;

            // Check if the entered credentials match the dummy credentials
            if (enteredUsername === dummyCredentials.username && enteredPassword === dummyCredentials.password) {
                // Hide the login form and show the admin interface
                document.getElementById('loginFormContainer').style.display = 'none';
                document.getElementById('adminInterface').style.display = 'block';
                renderTable(formDataDB);
            } else {
                // Show an error message
                alert('Invalid username or password');
            }
        });

        // Function to render form data in the table
        function renderTable(data) {
            const tableBody = document.getElementById('formDataTable');
            tableBody.innerHTML = '';

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="py-2 px-4 border-b">${item.name}</td>
                    <td class="py-2 px-4 border-b">${item.employeeId}</td>
                    <td class="py-2 px-4 border-b">${item.designation}</td>
                    <td class="py-2 px-4 border-b">${item.department}</td>
                    <td class="py-2 px-4 border-b">${item.amountRequested}</td>
                    <td class="py-2 px-4 border-b">
                        <button class="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-700" onclick="approveRequest(${item.id})">Approve</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onclick="rejectRequest(${item.id})">Reject</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Approve request function
        function approveRequest(id) {
            const formData = formDataDB.find(item => item.id === id);
            if (formData) {
                // Simulate sending email
                alert(`Request by ${formData.name} approved and email sent.`);
                // Remove the approved request from the table
                formDataDB.splice(formDataDB.indexOf(formData), 1);
                renderTable(formDataDB);
            }
        }

        // Reject request function
        function rejectRequest(id) {
            const formData = formDataDB.find(item => item.id === id);
            if (formData) {
                // Simulate rejection process
                alert(`Request by ${formData.name} rejected.`);
                // Remove the rejected request from the table
                formDataDB.splice(formDataDB.indexOf(formData), 1);
                renderTable(formDataDB);
            }
        }
 