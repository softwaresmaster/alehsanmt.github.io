<?php
// order.php
header('Content-Type: application/json; charset=utf-8');

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success'=>false, 'message'=>'Invalid request']);
    exit;
}

// Read input (JSON)
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

// fallback if form-encoded
if (!$data) {
    $data = $_POST;
}

// Validate required fields
$name = trim($data['customerName'] ?? '');
$phone = trim($data['customerPhone'] ?? '');
$address = trim($data['customerAddress'] ?? '');
$cartData = trim($data['cartData'] ?? '');
$cartJSON = $data['cartJSON'] ?? '';

if (!$name || !$phone || !$address || !$cartData) {
    echo json_encode(['success'=>false, 'message'=>'Missing required fields']);
    exit;
}

// sanitize basic
function safe($s){ return substr(trim(strip_tags($s)),0,5000); }
$name = safe($name);
$phone = safe($phone);
$address = safe($address);
$cartData = safe($cartData);

// Build email
$to = 'wallarts@alehsanmt.com'; // booking email
$subject = "New Wall Arts Order - {$name}";

$message = "You have received a new order from your website.\n\n";
$message .= "Customer Name: {$name}\n";
$message .= "Phone: {$phone}\n";
$message .= "Address: {$address}\n\n";
$message .= "Ordered Items:\n{$cartData}\n\n";
$message .= "Cart JSON: " . ($cartJSON ? $cartJSON : 'N/A') . "\n\n";
$message .= "Time: " . date('Y-m-d H:i:s') . " (server time)\n";

// Headers
$headers = "From: no-reply@alehsanmt.com\r\n";
$headers .= "Reply-To: {$name} <no-reply@alehsanmt.com>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// try sending
$sent = @mail($to, $subject, $message, $headers);

if ($sent) {
    echo json_encode(['success'=>true, 'message'=>'Order sent']);
    exit;
} else {
    // mail failed — log or return error
    // Optionally write to a server-side log file for manual retrieval:
    $logline = "[".date('Y-m-d H:i:s')."] ORDER FAILED: ".json_encode([
        'name'=>$name,'phone'=>$phone,'address'=>$address,'cart'=>$cartData
    ])."\n";
    @file_put_contents(__DIR__.'/orders_fallback.log', $logline, FILE_APPEND | LOCK_EX);

    echo json_encode(['success'=>false, 'message'=>'Failed to send email']);
    exit;
}
?>
