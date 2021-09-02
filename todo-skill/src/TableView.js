import React from 'react';
import './TableView.css';
import {  makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';



const headCells = [
  { id: 'task', numeric: false, disablePadding: true, label: 'Tasks' },
  { id: 'spl', numeric: true, disablePadding: false, label: 'Specialization' },
  { id: 'skill', numeric: true, disablePadding: false, label: 'Skills' },
  { id: 'cat', numeric: true, disablePadding: false, label: 'Task-Type' },
  { id: 'start', numeric: true, disablePadding: false, label: 'Start Date' },
  { id: 'end', numeric: true, disablePadding: false, label: 'Targeted Date' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' }
  
];


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
  

  return (
    <TableHead>
      <TableRow>
      <TableCell>

</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            
              {headCell.label}
              {orderBy === headCell.id ? (
                <span>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
           
          </TableCell>
        ))}
        
      </TableRow>
    </TableHead>
  );
}





const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export const TableView = ({ todo, getLatestTodos })=> {

//export default function TableView(row, getLatestTodos) {
  const classes = useStyles();
  const order = 'asc'
  const orderBy = 'calories'
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [msg, setMsg] =  React.useState([]);
  var [rows, setrows] = React.useState([]);
  //var rows = []
 console.log(todo)
 rows = todo
 
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.task);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
   
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

//   const getLatestTodos = () => {
//     fetch('/api').then(response => {
//         if(response.ok){
//             return response.json()
//         }
//     }).then(data => setrows(data))
// }

  const handleSave = () => {
   for(var id=0;id<selected.length;id++)
   {
     
    fetch('/change_status', {
      method: 'POST',
      body: JSON.stringify({
       id:selected[id],
       status: "Todo"
    }),
    headers: {
        "Content-Type": "application/json; chartset=UTF-8"
    }
  }).then(response => response.json())
  .then(message => console.log(message))
    }
    alert("Task/s Status Saved")
    getLatestTodos()
   }

   const handleDelete =() =>{
    for(var id=0;id<selected.length;id++)
   {
     fetch(`/api/${selected[id]}`, {
      method: "POST",
      body: JSON.stringify({
          id:selected[id]
      })
  }).then(response => response.json())
    .then(message => {
        console.log(message)
    })
   }
   alert("Task/s Deleted")
   getLatestTodos()
     }
    
 
   

  const isSelected = (name,status) => {
    if(selected.indexOf(name) !== -1)
    return true;
    else 
    return false;
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    
    <div>
     
        <TableContainer>
          <Table
            
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id, row.status);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.task}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.task}
                      </TableCell>
                      
                      <TableCell align="right">{row.spl}</TableCell>
                      <TableCell align="right">{row.skill}</TableCell>
                      <TableCell align="right">{row.cat}</TableCell>
                      <TableCell align="right">{row.start}</TableCell>
                      <TableCell align="right">{row.end}</TableCell>
                     <TableCell align="right" >{row.status}</TableCell>
                     
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
       <div>
    <input className="save" type="button" onClick={() => handleSave()} value="save"></input>
     <input className="delete" type="button" value="Delete Task/s" onClick={()=> handleDelete()}></input>
     </div>
    </div>
   
   
   
   
  );
}
