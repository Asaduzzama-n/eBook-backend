import { sendMail } from '../auth/sendResetMail';

export const sendInvoiceMail = async (result: any) => {
  const content = ` <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; background-color: #fff; font-family: Arial, sans-serif;">

    <div style="text-align: center;">
      // <img style="max-height: 80px;" src="{logo}" alt="Logo">
    </div>

    <div>
      <p><strong>Invoice no:</strong> <span style="color: #0066cc;">${result?.invoiceId}</span></p>
      <p><strong>Invoice date:</strong> <span>${result?.createdAt}</span></p>
      <p><strong>Status:</strong> <span style="color: #0066cc;">${result?.paymentStatus.toLowerCase()}</span></p>
    </div>

    <hr style="border-top: 1px solid #ccc; margin: 10px 0;">

    <div>
      <p style="font-weight: bold; color: #0066cc;">Bill to</p>
      <p><strong>${result?.userId?.name.firstName}</strong></p>
      <p>${result?.userId?.email}</p>
      <p>${result?.userId?.contactNo}</p>
      <p>${result?.userId?.address}</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
      <thead>
        <tr style="border-bottom: 2px solid #0066cc;">
          <th style="padding: 10px;">Cover</th>
          <th style="padding: 10px;">Title</th>
          <th style="padding: 10px;">Price</th>
        </tr>
      </thead>

      <tbody>
        ${result?.books?.map(
          (book: any) => `
          <tr style="border-bottom: 1px solid #ccc;">
            <td style="padding: 10px;"><img style="max-height: 60px;" src="${book.coverImg.url}" alt="{book.title}"></td>
            <td style="font-weight: bold; padding: 10px; text-align: center;">${book.title}</td>
            <td style="padding: 10px; text-align: center;">${book?.price}</td>
          </tr>`,
        )}

        <tr>
          <td></td>
          <td style="padding: 10px; text-align: right;"><strong>Subtotal</strong></td>
          <td style="font-weight: bold; padding: 10px; text-align: center;">${result?.amount}</td>
        </tr>

        <tr>
          <td></td>
          <td style="padding: 10px; text-align: right;"><strong>Discount</strong></td>
          <td style="font-weight: bold; padding: 10px; text-align: center;">${result?.amount}</td>
        </tr>

        <tr>
          <td></td>
          <td style="padding: 10px; text-align: right;"><strong>Total</strong></td>
          <td style="border-bottom: 2px solid #0066cc; font-weight: bold; padding: 10px; text-align: center;">${result?.amount}</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 20px;">
      <p style="font-weight: bold;">Notes</p>
      <p style="color: #0066cc; font-weight: bold;">Thank you for your purchase</p>
      <p style="font-weight: bold;">Terms & Condition</p>
      <p style="color: #0066cc; font-weight: bold;">You have agreed to our terms & condition</p>
    </div>

  </div>`;

  await sendMail(result?.userId?.email, 'Thank you for your purchase', content);
};
