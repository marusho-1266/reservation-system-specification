function sendEditConfirmationEmail(emailAddress, bookingId, newDateTime, newContent) {
  // 件名を設定
  var subject = '【予約変更確認】';

  // 本文を設定
  var body = '予約ID: ' + bookingId + 'の予約内容を変更しました。\n\n';

  if (newDateTime) {
    body += '新しい予約日時: ' + newDateTime + '\n';
  }

  if (newContent) {
    body += '新しい予約内容: ' + newContent + '\n';
  }

  body += '\nお問い合わせ先: example@example.com';

  // メールを送信
  try {
    MailApp.sendEmail({
      to: emailAddress,
      subject: subject,
      body: body
    });
  } catch (e) {
    Logger.log('変更確認メールの送信に失敗しました。' + e);
  }
}
