import React from 'react'
import Table from 'react-bootstrap/Table';
function TableDisplay(volts) {
    return (
        <>
            <Table striped bordered hover>
                <tbody className='child'>
                    {
                        volts?.data.map((e, i) => (

                            <tr>
                                <td>{i}</td>
                                <td>Mark</td>
                                <td>{e.Voltage}</td>
                            </tr>
                        ))
                    }



                </tbody>
            </Table>
        </>

    )
}

export default TableDisplay