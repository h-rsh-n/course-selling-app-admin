import Skeleton from '@mui/material/Skeleton';

export const Loader1 = ()=>{
  return(
    <Skeleton sx={{marginBottom:"5px"}} variant="rounded" width={450} height={85}  animation="wave"/>
  )
} 

export const Loader2 = ()=>{
  return(
    <Skeleton style={{marginRight:"20px"}}variant="rounded" width={375} height={475}  animation="wave"/>
  )
} 