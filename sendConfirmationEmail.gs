function sendConfirmationEmail(e) {
  // フォームの回答を取得
  var responses = e.response.getItemResponses();

  // メールアドレスを取得
  var emailAddress = responses[1].getResponse();

  // 件名を設定
  var subject = '【予約確認】予約内容のご確認';

  // 本文を設定
  var body = 'この度はご予約いただきありがとうございます。\n\n' +
             '以下の内容でご予約を承りました。\n\n' +
             '氏名: ' + responses[0].getResponse() + '\n' +
             'メールアドレス: ' + responses[1].getResponse() + '\n' +
             '電話番号: ' + responses[2].getResponse() + '\n' +
             '予約日時: ' + responses[3].getResponse() + '\n' +
             '予約内容/目的: ' + responses[4].getResponse() + '\n' +
             '備考: ' + responses[5].getResponse() + '\n\n' +
             'キャンセル・変更方法については、以下のURLをご確認ください。\n' +
             'https://example.com/cancel\n\n' +
             'お問い合わせ先: example@example.com';

  // メールを送信
  MailApp.sendEmail(emailAddress, subject, body);
}
