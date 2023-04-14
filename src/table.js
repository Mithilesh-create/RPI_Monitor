import React from 'react'
import Table from 'react-bootstrap/Table';
function TableDisplay(volts) {
    return (
        <>
            <Table striped bordered hover>
                <tbody className='child'>
                    {
                        volts?.data.map((e, i) => {
                            var arr = e.Time.split(" ");
                            var timeround = arr[1].split(".")
                            return <tr key={i}>
                                <td className='col-md-2'>{arr[0]}</td>
                                <td className='col-md-2'>{timeround[0]}</td>
                                <td className='col-md-2'>{e.Voltage}</td>
                            </tr>

                        }
                        )
                    }
                </tbody>
            </Table>
        </>

    )
}

export default TableDisplay