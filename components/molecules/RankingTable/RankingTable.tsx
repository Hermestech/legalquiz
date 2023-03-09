import * as React from 'react';
import { Container } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams
} from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Posición',
        width: 70
    },
    {
        field: 'user',
        headerName: 'Jugador',
        width: 180,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.user.handle}`
    },
    { field: 'points', headerName: 'Puntos', width: 100 },
];

interface RankingProps { 
    rows: any;
}

export default function RankingTable({ rows }: RankingProps) { 
      const rowsWithId = rows.map((row: any, index: number) => ({ ...row, id: index + 1 }));

    return (
        <Container
            sx={{
                height: 400,
                width: {
                    xs: '100%',
                    md: '60%',
                },
                marginTop: '2rem',
            }}
        >
            <DataGrid
                rows={rowsWithId}
                columns={columns}
                getRowId={(row) => row.auth0_id}
            />
        </Container>
    )
}