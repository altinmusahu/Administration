const createEmployeeInvoice = (doc, data) => {
    doc.fontSize(12);
    doc.lineGap(8);
  
    doc.text("Pay Stub Records", { align: "center", fontSize: 24 });

  
    doc.font("Helvetica");
    data.forEach((employee) => {

      doc.text("Employee Name : "+employee.result[0].name);
      doc.text("Employee Salary : "+employee.salary);

      doc.text("Days Off : "+employee.daysDifference);
      doc.text("Date : "+employee.startdate + "-" + employee.enddate);

      doc.text("Deductions per day : "+employee.averageSalary);
      doc.text("Total detuctions : "+employee.DaysOffAmount);
      doc.text("Expenses : "+employee.expenses);
      doc.text("Total Amount : "+employee.totalAmount);

      doc.moveDown();
    });
  
  };
  
  module.exports = createEmployeeInvoice;
  