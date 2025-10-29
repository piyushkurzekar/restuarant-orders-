export const generateInvoiceHTML = (order) => {
  const formatDate = (date) => new Date(date).toLocaleString("en-IN");

  const itemsHTML = order.items
    ?.map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td style="text-align:center;">${item.price}</td>
          <td style="text-align:center;">${item.quantity || 1}</td>
          <td style="text-align:right;">${item.total || item.price * (item.quantity || 1)}</td>
        </tr>
      `
    )
    .join("");

  const notesHTML = order.notes
    ?.map(
      (note) => `
        <tr style="background-color:#cff4fc;">
          <td>${note.text} (Extra)</td>
          <td style="text-align:center;">${note.price}</td>
          <td style="text-align:center;">${note.qty}</td>
          <td style="text-align:right;">${note.price * note.qty}</td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoice - ${order.guestName}</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: #fff;
      margin: 0;
      padding: 20px;
      position: relative;
    }
    .container {
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 25px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      position: relative;
    }
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 5rem;
      color: rgba(0,0,0,0.07);
      font-weight: 700;
      text-transform: uppercase;
      pointer-events: none;
      user-select: none;
      z-index: 0;
      text-align: center;
    }
    .content { position: relative; z-index: 1; }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
    }
    .left h2 {
      color: #198754;
      margin-bottom: 5px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .table th, .table td {
      border: 1px solid #ccc;
      padding: 8px 10px;
    }
    .table th {
      background-color: #d1e7dd;
    }
    tfoot th {
      background: #fff;
      color: #198754;
      font-size: 1.1rem;
    }
    .text-end { text-align: right; }
    .text-center { text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="watermark">SHIVAAM FARMS & RESORTS</div>

    <div class="content">
      <div class="header">
        <div class="left">
          <h2>SHIVAAM FARMS & RESORTS</h2>
          <p>01, AB, Green Planet, Omkar Nagar</p>
          <p>Phone: +91 7387750307</p>
          <p>Email: shivaamfarmsandresorts@gmail.com</p>
        </div>
        <div class="right" style="text-align:right;">
          <h3>INVOICE</h3>
          <p><strong>Invoice To:</strong> ${order.guestName}</p>
          <p><strong>Table:</strong> ${order.tableNumber}</p>
          <p><strong>Contact:</strong> ${order.contact}</p>
          <p><strong>Date:</strong> ${formatDate(order.dateTime)}</p>
          ${
            order.receiveby
              ? `<p><strong>Received By:</strong> ${order.receiveby}</p>`
              : ""
          }
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Description</th>
            <th class="text-center">Rate (₹)</th>
            <th class="text-center">Qty</th>
            <th class="text-end">Subtotal (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
          ${notesHTML || ""}
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3" class="text-end">Total Amount</th>
            <th class="text-end">₹ ${order.finalTotal}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</body>
</html>
  `;
};
