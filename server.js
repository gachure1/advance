const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simulated database
let formDataDB = [
    // Initial data for testing
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

// Serve admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Endpoint to fetch form data (for testing purposes)
app.get('/form-data', (req, res) => {
    res.json(formDataDB);
});

//Post form data

// Approve request endpoint
app.post('/approve-form', (req, res) => {
    const { id } = req.body;
    const formData = formDataDB.find(data => data.id === id);
    if (formData) {
        // Simulate sending email
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });
        let mailOptions = {
            from: 'your-email@gmail.com',
            to: 'gachureanthony@gmail.com',
            subject: 'Approved Salary Advance/IOU Request',
            text: JSON.stringify(formData, null, 2)
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            // Remove approved request from the database
            formDataDB = formDataDB.filter(data => data.id !== id);
            res.json({ success: true });
        });
    } else {
        res.status(404).send('Form data not found');
    }
});

// Reject request endpoint
app.post('/reject-form', (req, res) => {
    const { id } = req.body;
    const formData = formDataDB.find(data => data.id === id);
    if (formData) {
        // Remove rejected request from the database
        formDataDB = formDataDB.filter(data => data.id !== id);
        res.json({ success: true });
    } else {
        res.status(404).send('Form data not found');
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
