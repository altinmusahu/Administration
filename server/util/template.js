const createInvoice = (doc, data) => {
    doc.fontSize(12);
    doc.lineGap(5);
  
    doc.text("Invoice", { align: "center", fontSize: 18 });

  
    doc.font("Helvetica");
    data.forEach((payment) => {

      doc.text("Payment ID : "+payment.paymentId);
      doc.text("Amount : "+payment.amount + "$");
      doc.text("Client ID : "+payment.clientId);
      doc.text("Status : "+payment.status);
      doc.moveDown();
    });
  
  };
  
  module.exports = createInvoice;
  