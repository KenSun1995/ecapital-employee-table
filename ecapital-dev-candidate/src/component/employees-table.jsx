import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid";
import employees from '../data/mock-employees.json'
import FormatMoney from "../util/formatMoney";
import OperationArea from "./operationArea";
import '../css/table.css'

function EmployeesTable() {
    /**
     * editFlag state meaning
        * 0: default
        * 1: some record is edited
        * 2: some record is deleted
        * 3: some record is added
     */
    const [editFlag, setEditFlag] = useState(0);
    const [list, setList] = useState([]);                     // store employees list 

    const [inputFirstN, setInputFirstN] = useState('');       // firstName input field value
    const [inputLastN, setInputLastN] = useState('');         // lastName input field value
    const [inputSal, setInputSal] = useState('');             // salary input field value
    const [focusId, setFocusId] = useState('');               // indicate which record will be operated

    /**
     * initialize list:
        * (1) format salary
        * (2) add unique id for each employee
     */
    useEffect(() => {
        setList(employees.employees.map((item) => {
            item.salary = FormatMoney((item.salary + '').replace(/[$,]/g, ''));
            item.id = nanoid();
            return item
        }));
    }, []);

    /**
     * some employee info will be operated:
        * (1) update editFlag state
        * (2) fill in input field values
        * (3) update focusId state
     */
    const willOperate = (flag, inputFirstN = '', inputLastN = '', inputSal = '', focusId = '') => {
        setEditFlag(flag);
        setInputFirstN(inputFirstN);
        setInputLastN(inputLastN);
        setInputSal(inputSal);
        setFocusId(focusId);
    }

    /**
     * cancel operation
     */
    const cancel = () => {
        setEditFlag(0);
        setFocusId('');
    }

    /**
     * do operation:
        * 1: update
        * 2: delete
        * 3: add
     */
    const operateIt = () => {
        let listArr = list;
        if (editFlag === 1) {
            listArr = list.map((item) => {
                if (item.id === focusId) {                                  // find out whose id equal focusId, update
                    item.firstName = inputFirstN;
                    item.lastName = inputLastN;
                    item.salary = FormatMoney(inputSal.replace(/[$,]/g, ''));
                }
                return item;
            })
        } else if (editFlag === 2) {                                        // find out whose id equal focusId, delete
            listArr = list.filter((item) =>
                item.id !== focusId
            )
        } else if (editFlag === 3) {                                        // add new employee info
            let item = {};
            item.id = nanoid();
            item.firstName = inputFirstN;
            item.lastName = inputLastN;
            item.salary = FormatMoney(inputSal.replace(/[$,]/g, ''));
            list.push(item);
        }
        setList(listArr);                                                   // update list state and reset editFlag state
        setEditFlag(0);
    }

    /**
     * handleFirstN / handleLastN / handleSal
     *   -> get input field values
     */
    const handleFirstN = e => {
        setInputFirstN(e.target.value);
    }

    const handleLastN = e => {
        setInputLastN(e.target.value);
    }

    const handleSal = e => {
        setInputSal(e.target.value);
    }

    return (
        <div className="container clearfix">
            <div className="header">EMPLOYEES</div>
            <div className="title">
                <ul>
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li>Salary</li>
                </ul>
            </div>
            <div className="line"></div>
            <div className="list">
                <ul>
                    {
                        list.map((item) => {
                            return (
                                <li key={item.id}>
                                    <div>{item.firstName}</div>
                                    <div>{item.lastName}</div>
                                    <div>{item.salary}</div>
                                    <button className="edit-btn" onClick={() => { willOperate(1, item.firstName, item.lastName, item.salary, item.id) }}>Edit</button>
                                    <button className="delete-btn" onClick={() => { willOperate(2, item.firstName, item.lastName, item.salary, item.id) }}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="line"></div>
            {editFlag !== 0 ?
                <OperationArea
                    editFlag={editFlag}
                    inputFirstN={inputFirstN}
                    inputLastN={inputLastN}
                    inputSal={inputSal}
                    focusId={focusId}
                    cancel={cancel}
                    operateIt={operateIt}
                    handleFirstN={handleFirstN}
                    handleLastN={handleLastN}
                    handleSal={handleSal}
                />
                : null
            }
            <div className="trail">
                <button onClick={() => { willOperate(3) }}>Add Employee</button>
            </div>
        </div>
    )
}
export default EmployeesTable;
