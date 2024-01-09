import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee } from '../service/EmployeeService'
import { updateEmployee } from '../service/EmployeeService'
import { getEmployee } from '../service/EmployeeService'
import { getEmployeeByEmail } from '../service/EmployeeService'


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const { id } = useParams()

    const navigator = useNavigate()

    useEffect(() => {
        if (id) {
        getEmployee(id).then((response) => {
            const employee = response.data;
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setEmail(employee.email);
        }).catch(error => {
            console.log(error);
        });
        }
    }, []); 


    async function saveEmployee(e) {
        e.preventDefault();
        const isValidForm = await validateForm()
        if (isValidForm) {
            const employee = { firstName, lastName, email }
            console.log(employee)

            if (id) {
                updateEmployee(employee, id).then((response) => {
                    console.log(response.data)
                    navigator('/employees')
                }).catch(error => {
                    console.log(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data)
                    navigator('/employees')
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    async function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            setErrors({ ...errors, firstName: '' });

        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';

            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
            const isEmailUnique = await checkDuplidateEmail()
            if (!isEmailUnique.data) {
                errorsCopy.email = 'Email is duplicated';
                valid = false;
            }
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }
        const checkDuplidateEmail = async () => {

        try {
            const response = await getEmployeeByEmail(id, email)
            return response

        } catch (error) {
            console.log('error', error)
        }
    }

    function pageTitle() {
        return <h2 className='text-center'> {id ? 'Update Employee' : 'Add Employee'}</h2>;
    }

    return (
        <div className='container' style={{marginTop:'50px'}}>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2' >
                                <label>First Name:</label>
                                <input placeholder='First Name' name='firstName' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Last Name:</label>
                                <input placeholder='Last Name' name='lastName' className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Email:</label>
                                <input placeholder='Email' name='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <div className='text-center' style={{marginTop:'50px'}}>
                            <button className='btn btn-success  mb-2' onClick={saveEmployee}>Save</button>
                            <button className='btn btn-danger  mb-2' onClick={() => navigator('/employees')} style={{marginLeft:'15px'}}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent