import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../App/Models/Pagination";
interface Props{
    metaData:MetaData;
    onpageChange:(page:number)=> void;
}
export default function AppPagination({metaData,onpageChange}:Props){

    const {currentPage,totalPagesCount,pageSize,totalPages}=metaData
    return ( 
        <Box display="flex" justifyContent='space-between' alignItems='center'>
                <Typography>
                  Displaying {(currentPage - 1)* pageSize+1}-
                  {currentPage*pageSize > totalPagesCount ? totalPagesCount :currentPage*pageSize} of {totalPagesCount} items
                </Typography>
                <Pagination 
                color="secondary" size="large" 
                count={totalPages} page={currentPage}
                 onChange={(_e,page)=> onpageChange(page)}/>

              </Box>

    )
}