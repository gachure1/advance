<?php
$servername = "8080";
$username = "user1";
$password = "pass1";
$dbname = "ADVANCE";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$form_data = [
    'username' => $_POST['username'],
    'password' => $_POST['password'],
    'name' => $_POST['name'],
    'employee_id' => $_POST['employeeId'],
    'designation' => $_POST['designation'],
    'department' => $_POST['department'],
    'amount_requested' => $_POST['amountRequested'],
    'amount_in_words' => $_POST['amountInWords'],
    'reason' => $_POST['reason'],
    'applicant_signature' => $_POST['applicantSignature'],
    'date' => $_POST['date'],
    'recovery_amount' => $_POST['recoveryAmount'],
    'installments' => $_POST['installments'],
    'payable_month' => $_POST['payableMonth'],
    'received_by' => $_POST['receivedBy'],
    'accounts_approval_name' => $_POST['accountsApprovalName'],
    'accounts_signature' => $_POST['accountsSignature'],
    'accounts_date' => $_POST['accountsDate'],
    'not_approved_reasons' => $_POST['notApprovedReasons']
];

// Insert data into table
$sql = "INSERT INTO salary_advance_iou_requests (username, password, name, employee_id, designation, department, amount_requested, amount_in_words, reason, applicant_signature, date, recovery_amount, installments, payable_month, received_by, accounts_approval_name, accounts_signature, accounts_date, not_approved_reasons) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssssssssssssssssss",
    $form_data['username'],
    $form_data['password'],
    $form_data['name'],
    $form_data['employee_id'],
    $form_data['designation'],
    $form_data['department'],
    $form_data['amount_requested'],
    $form_data['amount_in_words'],
    $form_data['reason'],
    $form_data['applicant_signature'],
    $form_data['date'],
    $form_data['recovery_amount'],
    $form_data['installments'],
    $form_data['payable_month'],
    $form_data['received_by'],
    $form_data['accounts_approval_name'],
    $form_data['accounts_signature'],
    $form_data['accounts_date'],
    $form_data['not_approved_reasons']
);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
