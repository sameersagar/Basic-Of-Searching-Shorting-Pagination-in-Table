
import React,{useEffect, useState} from 'react'
import {
   MDBTable, 
   MDBTableHead,
   MDBTableBody, 
   MDBRow, 
   MDBCol, 
   MDBContainer, 
   MDBBtn, 
   MDBBtnGroup,
   MDBPagination,
   MDBPaginationItem,
   MDBPaginationLink 
  } from 'mdb-react-ui-kit';
import axios from 'axios';

function Table() {

  const[data, setData] = useState([]);
  const[valueSearch, setValueSearch] = useState();
  const[sortValue, setSortValue] = useState();
  const[currentPage, setCurrentPage] = useState(0);
  const[pageLimit] = useState(4);
  const[sortFilterValue, setSortFilterValue] = useState("")
  const[operation, setOperation] = useState("")

  const sortOption = ["name",  "email", "phone", "address", "id", "status"]

  useEffect(()=>{
    loadUserData(0, 4, 0)
  },[])

  const loadUserData = async (start, end, increase, optType=null, filterOrShortValue) => {
    switch(optType){
      case "search":
        setOperation(optType);
        setSortValue("");

        return await axios.get(`http://localhost:5000/users?q=${valueSearch}&_start=${start}&_end=${end}`)
        .then((res)=>{
          setData(res.data);
          setCurrentPage(currentPage + increase);
          //setValueSearch(""); //for Empty search field use (""), then its show full deta in table.
        })
        .catch((err)=>{console.log(err)})
      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrShortValue);
        return await axios.get(`http://localhost:5000/users?_sort=${filterOrShortValue}&_order=asc&_start=${start}&_end=${end}`)
        .then((res)=>{
          setData(res.data)
          setCurrentPage(currentPage + increase)
        })
        .catch((err)=>{console.log(err)})
        case "filter":
          setOperation(optType);
          setSortFilterValue(filterOrShortValue);
          return await axios.get(`http://localhost:5000/users?status=${filterOrShortValue}&_order=asc&_start=${start}&_end=${end}`)
          .then((res)=>{
            setData(res.data)
            setCurrentPage(currentPage + increase)
          })
          .catch((err)=>{console.log(err)})


        default:
          return(
            await axios.get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
            .then((res)=>{
              setData(res.data);
              setCurrentPage(currentPage + increase);
            })
            .catch((err)=>{console.log(err)})
          )
    }
    
   
  }

  console.table(data);

  const handleReset = () =>{
    setOperation("");
    setValueSearch("");
    setSortFilterValue();
    setSortValue("");
    loadUserData(0,4,0);
  }

  const handleSearch = async(e) =>{
    e.preventDefault();
    loadUserData(0,4,0, "search")
   /*  return await axios.get(`http://localhost:5000/users?q=${valueSearch}`)
    .then((res)=>{
      setData(res.data)
      setValueSearch("") //for Empty search field use (""), then its show full deta in table.
    })
    .catch((err)=>{console.log(err)}) */
  }
  const handleShort = async(e)=>{
   let value = e.target.value;
   setSortValue(value);
   loadUserData(0,4,0,"sort", value)
    /* return await axios.get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>{console.log(err)}) */
  }

  const handleFilter = async(value)=>{
    loadUserData(0,4,0, "filter", value)
    /*  return await axios.get(`http://localhost:5000/users?status=${filterValue}`)
     .then((res)=>{
       setData(res.data)
     })
     .catch((err)=>{console.log(err)}) */
  }

  const renderPagination = () =>{
    if(data.length < 4 && currentPage === 0) return null;
    if(currentPage === 0){
      return(
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() =>loadUserData(4, 8, 1,operation, sortFilterValue)}> Next </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    }else if(currentPage < pageLimit -1 && data.length === pageLimit){
      return(
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn onClick={() =>loadUserData((currentPage-1)*4, currentPage*4, -1, operation, sortFilterValue)}> Prev </MDBBtn>  {/* loadUserData(start, end, increase)  */}
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() =>loadUserData((currentPage + 1)*4, (currentPage +2)*4, 1, operation, sortFilterValue)}>  Next </MDBBtn>{/* loadUserData(start, end, increase) */}
          </MDBPaginationItem>
        </MDBPagination>
      )
    }else{
      return(
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn onClick={() =>loadUserData((currentPage - 1)*4, currentPage*4, -1, operation, sortFilterValue)}> Prev </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      )
    }
  }

  

  return (
    <MDBContainer>
      <form style={{margin:"auto", padding:"15px", maxWidth:"400px", alignContent:"center"}}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}>
          <input type="text" 
            className="form-control" 
            placeholder="Search Name..." 
            value={valueSearch}
            onChange={(e)=> setValueSearch(e.target.value)}
            />
           
              <MDBBtn type='submit' color='dark'>
                Search
              </MDBBtn>
              <MDBBtn className='mx-2' color='info' onClick={()=> handleReset()}>
                <i class="fa fa-refresh" aria-hidden="true"> </i>  Reset
              </MDBBtn>
           
      </form>

      <div style={{marginTop:"100px"}}>
        <h2 className='text-center'>
          Search, Filter, Short and Pagination Using JSON Fake API
        </h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>No.</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>ID</th>
                  <th scope='col'>Status</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ?(
                <MDBTableBody className='align-center mb-0'>
                  <tr>
                    <td colSpan={8} className="text-center mb-0">No Data Found</td>
                  </tr>
                </MDBTableBody>
              ):(
                data.map((item, index) =>(
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope='row'>{index+1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.id}</td>
                      <td>{item.status}</td>
                    </tr>
                  </MDBTableBody>
               ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <div style={{margin:"auto", padding:"15px", maxWidth:"250px", alignContent:"center"}}>{renderPagination()}</div>
      </div>
      <MDBRow>
        <MDBCol size="8">
          <h5>Short By:</h5>
          <select style={{width:"50%", borderRadius:"2px", height:"35px"}}
            onChange={handleShort}
            value={sortValue}>
              <option>Please Select Value</option>
             { sortOption.map((item, index)=>{
               return(
                 <option value={item} key={index}>{item}</option>
               )
             })
             }
          </select>
        </MDBCol>
        <MDBCol size="4">
          <h5>Filter By Status:</h5>
          <MDBBtnGroup>
            <MDBBtn color='success' onClick={()=> handleFilter("Active")}>Active</MDBBtn>
            <MDBBtn color='danger' style={{marginLeft:"2px"}} onClick={()=> handleFilter("Inactive")}>Inactive</MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Table;