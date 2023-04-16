import React from 'react'
import Table from 'react-bootstrap/Table';
function ParamTable(datavals) {
    return (
        <>
            <Table striped bordered hover>
                <tbody className='child'>
                    {
                        datavals?.data.map((e, i) => {
                            var timeround = e?.time.split("T")
                            return <tr key={i}>
                                <td className='col-md-2'>{timeround[0]}</td>
                                <td className='col-md-2'>{timeround[1]}</td>
                                <td className='col-md-2'>{e?.isDay}</td>
                                <td className='col-md-2'>{e?.solar}</td>
                                <td className='col-md-2'>{e?.windspeed}</td>
                                <td className='col-md-2'>{e?.winddirection}</td>
                                <td className='col-md-2'>{e?.rain}</td>


                            </tr>

                        }
                        )
                    }
                </tbody>
            </Table>
        </>

    )
}

export default ParamTable