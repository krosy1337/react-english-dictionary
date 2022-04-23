import React, {FC, useState} from 'react'
import {DataGrid, GridColDef, GridSelectionModel} from "@mui/x-data-grid"
import {Box, Popover, Typography} from "@mui/material"
import {useAppSelector} from "../hooks/redux"

interface IProfileTranslate {
    id: string
    word: string
    translate: string
}

interface ProfileDictionaryProps {
    setSelectedRows: (row: GridSelectionModel | null) => void
}

const ProfileDictionary: FC<ProfileDictionaryProps> = ({setSelectedRows}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [popoverValue, setPopoverValue] = useState<string>('')
    const {dictionary} = useAppSelector(state => state.user)
    const columns: GridColDef[] = [
        {
            field: "word",
            headerName: "Word",
            editable: false,
            flex: 1,
        },
        {
            field: "translate",
            headerName: "Translate",
            editable: false,
            flex: 1,
        },
    ]
    const profileDictionary: IProfileTranslate[] | undefined = dictionary?.map((t) => {
        return {
            id: t.id,
            word: t.words[0].text[0],
            translate: t.words[1].text[0]
        }
    })

    const onPopoverClose = () => {
        setAnchorEl(null)
    }
    const onPopoverOpen = (e: React.MouseEvent<HTMLElement>) => {
        const field = e.currentTarget.dataset.field!
        const id = e.currentTarget.parentElement!.dataset.id!
        const row: any = profileDictionary?.find((r) => r.id === id)!
        const cellContent = e.currentTarget.children[0]
        const [paddingLeft, paddingRight] = [parseInt(getComputedStyle(e.currentTarget).paddingLeft),
            parseInt(getComputedStyle(e.currentTarget).paddingRight)]
        if (e.currentTarget.clientWidth - paddingLeft - paddingRight < cellContent?.scrollWidth) {
            setPopoverValue(row[field])
            setAnchorEl(e.currentTarget)
        }
    }
    const onRowsSelect = (newSelectionModel: GridSelectionModel) => {
        if (newSelectionModel.length) {
            setSelectedRows(newSelectionModel)
            return
        }
        setSelectedRows(null)
    }

    return (
        <Box sx={{
            height: 400,
            width: "100%",
        }}>
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
            {
                profileDictionary ?
                    <DataGrid rows={profileDictionary} columns={columns} pageSize={5}
                              rowsPerPageOptions={[5]} checkboxSelection
                              disableSelectionOnClick onSelectionModelChange={onRowsSelect}
                              getRowClassName={(params) => `app-theme--${params.row.isCorrect}`}
                              componentsProps={{
                                  cell: {
                                      onMouseEnter: onPopoverOpen,
                                      onMouseLeave: onPopoverClose,
                                  },
                              }}/>
                    :
                    <Typography variant="h1" fontSize="3rem" align="center">Ваш словарь пуст</Typography>
            }

        </Box>
    )
}

export default ProfileDictionary