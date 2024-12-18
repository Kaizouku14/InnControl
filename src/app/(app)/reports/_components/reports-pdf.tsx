import { TransactionReportProps } from "@/interface/reports";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 8,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 20,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderColor: "#d0d0d0",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  cell: {
    padding: 4, 
    flex: 1,
    textAlign: "center",
    fontSize: 8, 
  },
  headerCell: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    padding: 4,
    fontSize: 8, 
  },
  tableContainer: {
    flexDirection: "column",
    overflow: "hidden", 
  },

});

const TransactionReport = ({ transactions }: TransactionReportProps) => {
  return (
    <Document>
      <Page style={styles.page}>
        
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Guest Name</Text>
              <Text style={styles.headerCell}>Room No</Text>
              <Text style={styles.headerCell}>Check-In</Text>
              <Text style={styles.headerCell}>Check-Out</Text>
              <Text style={styles.headerCell}>Nights</Text>
              <Text style={styles.headerCell}>Payment</Text>
              <Text style={styles.headerCell}>Payment Date</Text>
              <Text style={styles.headerCell}>Method</Text>
              <Text style={styles.headerCell}>Type</Text>
              <Text style={styles.headerCell}>Service</Text>
              <Text style={styles.headerCell}>Balance</Text>
              <Text style={styles.headerCell}>Discount</Text>
            </View>

            {transactions && transactions.map((transaction, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cell}>{transaction.guest_fullname}</Text>
                <Text style={styles.cell}>{transaction.room_no}</Text>
                <Text style={styles.cell}>{transaction.check_in}</Text>
                <Text style={styles.cell}>{transaction.check_out}</Text>
                <Text style={styles.cell}>{transaction.no_of_nights}</Text>
                <Text style={styles.cell}>
                  ${transaction.payment_amount.toFixed(2)}
                </Text>
                <Text style={styles.cell}>{transaction.payment_date}</Text>
                <Text style={styles.cell}>{transaction.payment_method}</Text>
                <Text style={styles.cell}>{transaction.booking_type}</Text>
                <Text style={styles.cell}>
                  {transaction.additional_service || "N/A"}
                </Text>
                <Text style={styles.cell}>
                  {transaction.outstanding_balance || "N/A"}
                </Text>
                <Text style={styles.cell}>{transaction.discount || "N/A"}</Text>
              </View>
            ))}

            <View>
                 
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TransactionReport;
