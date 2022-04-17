import React, {FC} from 'react'
import {DataGrid, GridColDef, GridSelectionModel} from "@mui/x-data-grid"
import {Box, Typography} from "@mui/material"
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
            {
                profileDictionary ?
                    <DataGrid rows={profileDictionary} columns={columns} pageSize={5}
                              rowsPerPageOptions={[5]} componentsProps={{}} checkboxSelection
                              disableSelectionOnClick onSelectionModelChange={onRowsSelect}/>
                    :
                    <Typography variant="h1" fontSize="3rem" align="center">Ваш словарь пуст</Typography>
            }

        </Box>
    )
}

export default ProfileDictionary