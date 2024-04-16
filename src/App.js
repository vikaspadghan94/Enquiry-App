import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Form, Table,  } from 'react-bootstrap';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';




function App() {
  let [formData, setFormData] = useState(
  {
  uname:'',
  uemail:'',
  uphone:'',
  umessage:'',
  index: ''
  }
)

let [userData, setUserData] = useState([])

let getValue=(event)=>{

let oldData={...formData}
let inputName=event.target.name;
// console.log(inputName) after clicking the each box theyll show their name eg uname , uemail etc
let inputValue=event.target.value; // uname etc.
oldData[inputName]=inputValue;
setFormData(oldData)

}

let handleSubmit=(event)=>{
  
  let currentUserFormData={
    uname: formData.uname,
    uemail: formData.uemail,
    uphone: formData.uphone,
    umessage: formData.umessage
  }

if (formData.index==='') {
  

  let checkFilterUser= userData.filter((v)=> v.uemail==formData.uemail || v.uphone==formData.uphone)

  if (checkFilterUser.length==1) {
    // alert("Email or Phone already exists... ")
    toast("Email or Phone already exists...")
  }
  else{

  let oldUserData=[...userData, currentUserFormData] // Old Array + New Array Element
  // console.log(oldUserData); to check stored data
  setUserData(oldUserData)
   
  setFormData(
    {
      uname:'',
      uemail:'',
      uphone:'',
      umessage:'',
      index: ''
      }
  )
}
}else{
  // console.log(formData.index);
  let editIndex= formData.index;
  let oldData=userData;

  let checkFilterUser= userData.filter((v,i)=> (v.uemail==formData.uemail || v.uphone== formData.uphone) &&
 i!=editIndex)

 if (checkFilterUser.length==0) {
  
 

  oldData[editIndex]['uname']= formData.uname
  oldData[editIndex]['uemail']= formData.uemail
  oldData[editIndex]['uphone']= formData.uphone
  oldData[editIndex]['umessage']= formData.umessage

  setUserData(oldData)

  setFormData(
    {
      uname:'',
      uemail:'',
      uphone:'',
      umessage:'',
      index: ''
      }
  )
}else{
  toast.error("Email or Phone already exists...")

}

}



   event.preventDefault();
}

// console.log(formData);

let deleteRow=(indexNumber)=>{
  let filterDataAfterDelete=userData.filter((v,i)=>i!=indexNumber)
  // console.log(filterDataAfterDelete);
  // alert(indexNumber)
  setUserData(filterDataAfterDelete)
}

let editRow=(indexNumber)=>{
  // alert(indexNumber)

  let editData= userData.filter((v,i)=>i==indexNumber)[0]
  // console.log(editData);
editData['index']= indexNumber
// console.log(editData);
setFormData(editData)
}


  return (
    
    <div className="App">




      <Container fluid>
      <ToastContainer />
<Container>
  <Row>
    <Col className='text-center py-5'>
    <h1>Enquiry Now</h1>
    </Col>
  </Row>
<Row>
  <Col lg={5}>
    {userData.length}
  <form onSubmit={handleSubmit}>
    <div className='pb-3'>
<label className='form-label'>Name</label>
<input type='text' onChange={getValue} value={formData.uname} name='uname' className='form-control'/>
    </div>

    <div className='pb-3'>
<label className='form-label'>Email</label>
<input type='email' onChange={getValue} value={formData.uemail} name='uemail' className='form-control'/>
    </div>

    <div className='pb-3'>
<label className='form-label'>Phone</label>
<input type='text' onChange={getValue} value={formData.uphone} name='uphone' className='form-control'/>
    </div>

    <div className='mb-3'>
<label for="" className='form-label'>Message</label>
<textarea onChange={getValue} value={formData.umessage}  className='form-control' name='umessage' id='' rows="3" /> 
    </div>

    <button className='btn btn-primary'>
      {
        formData.index !== '' ? 'Update' : 'Save'
      }
    </button>
  </form>
  </Col>
  <Col lg={7}>
  <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userData.length>=1 ? 

        userData.map((obj,i)=>{
          return(

            <tr key={i}>
            <td>{i+1}</td>
            <td>{obj.uname}</td>
            <td>{obj.uemail}</td>
            <td>{obj.uphone}</td>
            <td>{obj.umessage}</td>
            <td>
              <button onClick={()=>deleteRow(i)}>Delete</button>
              <button onClick={()=>editRow(i)}>Update</button>
            </td>
          </tr>

          )
        })
        
        
      :

      <tr>
        <td colSpan={6}>No Data Found</td>
      </tr>
      }
        
        
      </tbody>
    </Table>
  </Col>
</Row>
</Container>
</Container>
    </div>
  );
}

export default App;
