import React, { useState } from 'react';
import { posts, USER } from '../../data/boardDummy';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', minWidth: 100, flex: 1 },
  { field: 'author', headerName: 'Author', width: 200 },
];

export default function BoardList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(posts);
  const [selectedIds, setSelectedIds] = useState({
    type: 'include',
    ids: new Set(),
  });

  const handleDelete = () => {
    const idsArray = Array.from(selectedIds.ids);
    const selectedAuthors = rows
      .filter((row) => idsArray.includes(row.id))
      .map((row) => row.author);
    if (selectedAuthors.filter((v) => v !== USER)) {
      alert('본인이 작성한 글만 삭제할 수 있습니다.');
    }
    setRows(rows.filter((row) => row.author !== USER));
    setSelectedIds({ type: 'include', ids: new Set() });
  };

  return (
    <div className='h-[500px] w-full bg-white'>
      <button onClick={handleDelete}>삭제</button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        onRowDoubleClick={(params) => {
          navigate(`/board/${params.row.id}`);
        }}
        checkboxSelection
        onRowSelectionModelChange={(newSelectedIds) => {
          setSelectedIds(newSelectedIds);
        }}
      />
    </div>
  );
}
