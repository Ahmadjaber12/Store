import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import LoadingComponent from "../../App/Layout/loadingComponent";
import { order } from "../../App/Models/order";
import OrderDetail from "./OrdersDetailed";

export default function Orders(){
    const [orders,setOrders]=useState<order[] | null>(null);
    const [loading,setLoading]=useState(true);
    const [SelectedOrderNumber,setSelectedOrderNumber]=useState(0);

    useEffect(()=>{
        agent.orders.list()
        .then(orders=>setOrders(orders))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false))
    },[])
    if(loading) return <LoadingComponent message="Loading Orders"/>
    if(SelectedOrderNumber > 0) 
      return (
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          <OrderDetail order={orders?.find(o=>o.id === SelectedOrderNumber)!} 
              setSelectedOrder={setSelectedOrderNumber}
          />
      )
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>order Number</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Order Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">{(order.total / 100).toFixed(2)}</TableCell>
                <TableCell align="right">{order.dateTime.split('T')[0]}</TableCell>
                <TableCell align="right">{order.orderStatus}</TableCell>
                <TableCell align="right">
                    <Button onClick={()=> setSelectedOrderNumber(order.id)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}