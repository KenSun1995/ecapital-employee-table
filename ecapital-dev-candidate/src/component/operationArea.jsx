import React, { Fragment } from 'react'
import '../css/table.css'
import PropTypes from "prop-types";

function OperationArea(params) {

    const { editFlag, inputFirstN, inputLastN, inputSal, cancel, operateIt, handleFirstN, handleLastN, handleSal } = params;

    return (
        <Fragment>
            <div className="edit-window">
                <input
                    disabled={editFlag === 2 ? true : false}     // input field disabled while deleting
                    value={inputFirstN}
                    onChange={handleFirstN}
                />
                <input
                    disabled={editFlag === 2 ? true : false}
                    value={inputLastN}
                    onChange={handleLastN}
                />
                <input
                    disabled={editFlag === 2 ? true : false}
                    value={inputSal}
                    onChange={handleSal}
                />
                <button className="edit-btn" onClick={() => { operateIt() }}>{editFlag !== 2 ? 'Submit' : 'Delete'}</button>
                <button className="delete-btn" onClick={() => { cancel() }}>Cancel</button>
            </div>
            <div className="line"></div>
        </Fragment>
    )
}

OperationArea.propTypes = {
    editFlag: PropTypes.number,
    inputFirstN: PropTypes.string,
    inputLastN: PropTypes.string,
    inputSal: PropTypes.string,
    cancel: PropTypes.func,
    operateIt: PropTypes.func,
    handleFirstN: PropTypes.func,
    handleLastN: PropTypes.func,
    handleSal: PropTypes.func,
};

OperationArea.defaultProps = {
    editFlag: 0,
    inputFirstN: '',
    inputLastN: '',
    inputSal: '',
    cancel: () => { },
    operateIt: () => { },
    handleFirstN: () => { },
    handleLastN: () => { },
    handleSal: () => { },
};

export default OperationArea;
