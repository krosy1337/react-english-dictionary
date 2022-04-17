import React, {FC, useState} from 'react'
import {Box, Popover, Typography} from "@mui/material"
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import {IFinallyDictionary} from "types/dictionary"

interface ResultProps {
    finallyList: IFinallyDictionary
    totalCorrect: number
}

const Result: FC<ResultProps> = ({finallyList, totalCorrect}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [popoverValue, setPopoverValue] = useState<string>('')

    const columns: GridColDef[] = [
        {
            field: 'word',
            headerName: 'Word',
            editable: false,
            flex: 1,
        },
        {
            field: 'currentTranslate',
            headerName: 'Current Translate',
            editable: false,
            flex: 1,
        },
        {
            field: 'translate',
            headerName: 'Your Translate',
            editable: false,
            flex: 1,
        },
    ]

    const onPopoverClose = () => {
        setAnchorEl(null)
    }
    const onPopoverOpen = (e: React.MouseEvent<HTMLElement>) => {
        const field = e.currentTarget.dataset.field!
        const id = e.currentTarget.parentElement!.dataset.id!
        const row: any = finallyList.find((r) => r.id === id)!
        const cellContent = e.currentTarget.children[0]
        const [paddingLeft, paddingRight] = [parseInt(getComputedStyle(e.currentTarget).paddingLeft),
            parseInt(getComputedStyle(e.currentTarget).paddingRight)]
        if (e.currentTarget.clientWidth - paddingLeft - paddingRight < cellContent?.scrollWidth) {
            setPopoverValue(row[field])
            setAnchorEl(e.currentTarget)
        }
    }
    return (
        <Box sx={{
            '& .app-theme--true': {
                backgroundColor: "#4caf5080",
            },
            '& .app-theme--false': {
                backgroundColor: "#ef535080",
            },
            '& .app-theme--true.MuiDataGrid-row:hover': {
                backgroundColor: "#4caf5066",
            },
            '& .app-theme--false.MuiDataGrid-row:hover': {
                backgroundColor: "#ef535066",
            },
            '& .app-theme--true.MuiDataGrid-row.Mui-selected': {
                backgroundColor: "#4caf50b3",
            },
            '& .app-theme--false.MuiDataGrid-row.Mui-selected': {
                backgroundColor: "#ef5350b3",
            },
            '& .app-theme--false.MuiDataGrid-row.Mui-selected:hover': {
                backgroundColor: "#ef5350b3",
            },
            '& .app-theme--true.MuiDataGrid-row.Mui-selected:hover': {
                backgroundColor: "#4caf50b3",
            },
        }}>
            <Typography variant="h3" fontSize="2rem"
                        align="center">Total: {finallyList.length}</Typography>
            <Typography variant="h4" fontSize="1.5rem"
                        align="center">Correct: {totalCorrect}</Typography>
            <Box sx={{height: 400, width: "100%"}}>
                <DataGrid rows={finallyList} columns={columns} pageSize={5}
                          rowsPerPageOptions={[5]}
                          getRowClassName={(params) => `app-theme--${params.row.isCorrect}`}
                          componentsProps={{
                              cell: {
                                  onMouseEnter: onPopoverOpen,
                                  onMouseLeave: onPopoverClose,
                              },
                          }}/>
                <Popover sx={{pointerEvents: "none"}} open={!!anchorEl} anchorEl={anchorEl}
                         anchorOrigin={{
                             vertical: "bottom",
                             horizontal: "left",
                         }}
                         transformOrigin={{
                             vertical: "top",
                             horizontal: "left",
                         }}
                         onClose={onPopoverClose}
                         disableRestoreFocus
                >
                    <Typography sx={{padding: 1,}}>{popoverValue}</Typography>
                </Popover>
            </Box>
        </Box>
    )
}

export default Result