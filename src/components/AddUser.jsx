import { useEffect } from "react";
import Table from "react-bootstrap/Table";

function AddUser({ tableUser }) {
  return (
    <Table  style={{
        width: "50rem",
        margin: "auto",
        padding: "2rem",
        border: "none",
        marginBottom:"2rem"
        
      }}>
      <thead >
        <tr>
          <th style={{color:"purple"}} >First Name</th>
          <th style={{color:"purple"}}>Age</th>
          <th style={{color:"purple"}}>Email</th>
          <th style={{color:"purple"}}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {tableUser.map((user, index) => (
          <tr key={index}>
            <td>{user.name?.first + " " + user.name?.last}</td>
            <td>{user.dob?.age}</td>
            <td>{user.email}</td>
            <td>{user.cell}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AddUser;
