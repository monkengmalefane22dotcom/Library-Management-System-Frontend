
function TransactionHistory({ transactions }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Member / Staff</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.bookTitle}</td>
                <td>{transaction.memberName}</td>
                <td>{transaction.type}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
