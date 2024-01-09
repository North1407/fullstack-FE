import React, {useEffect, useState} from 'react'
import { listEmployees } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { deleteEmployee } from '../service/EmployeeService'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllEmployees()
    }, [])

function getAllEmployees() {
    listEmployees().then((response) => {
        setEmployees(response.data);
    }).catch(error => {
        console.log(error);
    })
}
    
function addNewEmployee() {
    navigate('/add-employee')
}

function updateEmployee(id) {
    navigate(`/update-employee/${id}`)
}

function removeEmployee(id) {
    console.log(id)
    deleteEmployee(id).then((response) => {
        console.log(response.data)
        getAllEmployees()
    }).catch(error => {
        console.log(error);
    })
}

  return (
    <div>
        <h2 className='text-center'>Employees List</h2>
        <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)} 
                                    style={{marginLeft: '10px'}} >Delete</button>                                    
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
    </div>

  )
}


export default ListEmployeeComponent