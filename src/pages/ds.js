{/* Your JSX for rendering the customer details */}
{loading && <p>Loading...</p>}
{error && <p>Error: {error.message}</p>}
{!loading && !error && (
  <div>
    <h2>Customer Details</h2>
    <p>Customer Name: {customerData.customer_name}</p>
    <p>Address: {customerData.address}</p>
    <p>Date of Birth: {customerData.dob}</p>
    <p>Phone Number: {customerData.phone_number}</p>
    <p>Email: {customerData.email}</p>
    {/* Add more fields as needed */}
  </div>
)}