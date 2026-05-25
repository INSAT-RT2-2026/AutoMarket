<?php
function sendWelcomeEmail($toEmail, $toName) {
    $payload = json_encode([
        'from'    => 'onboarding@resend.dev',
        'to'      => [$toEmail],
        'subject' => 'Welcome to TunLuxAuto',
        'html'    => "
            <div style='font-family:Arial;background:#0a0a0a;color:white;padding:40px;max-width:600px;margin:0 auto;'>
                <h1 style='color:#d4af37;letter-spacing:2px;'>TunLuxAuto</h1>
                <h2 style='color:white;margin-top:24px;'>Welcome, {$toName}!</h2>
                <p style='color:#aaa;line-height:1.7;'>Your account has been created successfully. You can now browse our collection, submit inquiries, and list your own vehicles.</p>
                <a href='https://automarket-production-ac0c.up.railway.app' style='display:inline-block;margin-top:24px;padding:12px 32px;background:#d4af37;color:black;font-weight:bold;border-radius:25px;text-decoration:none;'>Browse Collection</a>
                <p style='color:#555;font-size:0.8rem;margin-top:40px;'>TunLuxAuto · Premium Cars Tunisia</p>
            </div>
        "
    ]);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . getenv('MAIL_PASS'),
            'Content-Type: application/json'
        ]
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200) {
        error_log('Resend API error: ' . $response);
        return false;
    }
    return true;
}
?>