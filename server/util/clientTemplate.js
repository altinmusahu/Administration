const createClientInvoice = (doc, receipt) => {
  // Set font size and line gap
  doc.fontSize(12);
  doc.lineGap(8);

  // Header: Title
  doc.text("Receipt", { align: "center", fontSize: 24 });


  // Add some space
  doc.moveDown();

  // Content: Receipt details
  doc.text("Receipt Details:", { align: "left", bold: true });
  doc.text(`Receipt ID: ${receipt._id}`, { align: "left" });
  doc.text(`Date: ${receipt.paymentDate}`, { align: "left" });
  doc.text(`Amount: ${receipt.paymentAmount}`, { align: "left" });
  doc.text(`Memo: ${receipt.memo}`, { align: "left" });


  // Add some space
  doc.moveDown();

  // Footer: Thank you message
  doc.text("Thank you for your payment!", { align: "center" });
};

module.exports = createClientInvoice;
