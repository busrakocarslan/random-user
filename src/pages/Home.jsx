import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { FcMindMap, FcIphone } from "react-icons/fc";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import AddUser from "../components/AddUser";

function User() {
  const [newUser, setNewUser] = useState([]);
  const [show, setShow] = useState("");
  const [tableUser,setTableUser]=useState([]);//tabloya çıkan useri eklemek için 
  // const [email, setEmail] = useState(false);bunlarla değil useEffect ile yapıldı
  // const [cell, setCell] = useState(false);
  // const [age, setAge] = useState(false);
  // const [location, setLocation] = useState(false);

  const getUser = async () => {
    try {
      const res = await axios("https://randomuser.me/api/");
      console.log(res.data.results[0]); //axios kullandığım için yeniden res.json() yapıp değer atamadım.
      setNewUser(res.data.results[0]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    //sayfa yenilediğinde geliyor
    getUser();
  }, []);

  useEffect(() => {
    if (newUser.name) {
      setShow(`My name is ${newUser.name?.first} ${newUser.name?.last}`);
    } else if (newUser.email) {
      setShow(`My email is ${newUser.email}`);
    } else if (newUser.cell) {
      setShow(`My phone is ${newUser.cell}`);
    } else if (newUser.location?.street?.name) {
      setShow(`My Street is ${newUser.location.street.name}`);
    } else if (newUser.dob?.age) {
      setShow(`My age is ${newUser.dob.age}`);
    } else {
      setShow(" ");
    }
  }, [newUser]);

  const handleUser = () => {
    getUser();
  };
  const handleMouseOver = (info) => {
    setShow(info);
  };
  const handleAddUser=()=>{
    setTableUser([...tableUser,newUser])

  }
  return (
    <div className="w-75 m-auto mt-5 bg-light">
      <Card
        style={{
          width: "50rem",
          margin: "auto",
          padding: "2rem",
          border: "none",
          backgroundColor: "olive",
        }}
      >
        {newUser.picture && (
          <div className="d-flex align-items-center justify-content-center mb-5">
            <Card.Img
              variant="top"
              className="rounded-circle w-25 me-5"
              src={newUser.picture?.medium}
              alt=""
            />
            <div className="text-end">
              <h4 style={{color:"purple",fontWeight:"900"}}>                
                {newUser.name?.title +
                  " " +
                  newUser.name?.first +
                  " " +
                  newUser.name?.last}{" "}
              </h4>
            </div>
          </div>
        )}
        {/*? işaretinin alternatifi burada && */}
        <Card.Body>
          <Card.Title>
            {/*" " boşluk olsun arasında + ile birleştirdiğin kelimelerin arasına koyuyor. */}
            <div>
              <h5>{show}</h5>
              {/* buraya show u yazmasan useEffect uygulanmadı, handlemouseover uygulanmadı */}
            </div>

            {/* {email && <h5>My email is {newUser.email}</h5>}
            {!email && cell && <h5>My phone is {newUser.cell}</h5>}
            {!email && !cell && location && (
              <h5>My Street is {newUser.location?.street?.name}</h5>
            )}
            {!email && !cell && !location && age && (
              <h5>My age is {newUser.dob?.age}</h5>
            )} */}

            {/*Öenmli! nested objlerden çekerken ? kullan yoksa hata vertiyor!!!* */}
          </Card.Title>
          <Card.Text className="d-flex align-items-center justify-content-evenly fs-1 mt-2">
            {/*cardda gap kullanamadım card-text div bileşeni olduğundan imiş?  */}
            {newUser.gender === "female" ? (
              <FcBusinesswoman onMouseOver={()=>handleMouseOver(`My name is ${newUser.name?.first} ${newUser.name?.last}`)}/>
            ) : (
              <FcBusinessman onMouseOver={()=>handleMouseOver(`My name is ${newUser.name?.first} ${newUser.name?.last}`)} />
            )}

            <FcIphone
              onMouseOver={() => handleMouseOver(`My phone is ${newUser.cell}`)}
            />
            <TfiEmail
              onMouseOver={() =>
                handleMouseOver(`My email is ${newUser.email}`)
              }
            />
            <FcMindMap
              onMouseOver={() =>
                handleMouseOver(
                  `My Street is ${newUser.location?.street?.name}`
                )
              }
            />
            <LiaBirthdayCakeSolid
              onMouseOver={() =>
                handleMouseOver(`My age is ${newUser.dob?.age}`)
              }
            />
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex align-items-center justify-content-evenly fs-5 mt-2 bg-gradient">
          <button type="button" onClick={handleUser} style={{borderRadius:"10px",padding:"10px", border:"none",backgroundColor:"purple", color:"olive"}}>
            NEW USER
          </button>
          <button type="button" style={{borderRadius:"10px",padding:"10px", border:"none",backgroundColor:"white", color:"olive"}} onClick={handleAddUser}>ADD USER</button>
        </Card.Footer>
      </Card>
      <AddUser tableUser={tableUser}/>
    </div>
  );
}

export default User;
