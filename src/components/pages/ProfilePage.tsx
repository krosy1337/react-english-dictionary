import React, {FC, FormEvent, useState} from 'react'
import {Box, Button, CircularProgress, Fade, Modal, Stack, TextField, Typography} from "@mui/material"
import ProfileDictionary from "../ProfileDictionary"
import {RouteNames} from "types/routes"
import {Navigate} from "react-router-dom"
import {useActions, useAppSelector} from "hooks/redux"
import {GridSelectionModel} from "@mui/x-data-grid"

const ProfilePage: FC = () => {
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel | null>(null)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [word, setWord] = useState<string>('')
    const [translate, setTranslate] = useState<string>('')
    const {user, isLoading} = useAppSelector(state => state.user)
    const {addWord, deleteWords} = useActions()

    if (isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
            </div>
        )
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, callback: (value: string) => void) => {
        callback(e.currentTarget.value)
    }
    const onSubmit = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault()

        if (!word || !translate) {
            return
        }

        addWord({word, translate})

        setWord('')
        setTranslate('')
        setModalOpen(false)
    }
    const onDeleteWord = () => {
        if (selectedRows) {
            deleteWords(selectedRows)
        }
    }

    return (
        <>
            {
                user
                    ?
                    <>
                        <Stack direction="row">
                            <Button sx={{fontSize: {xs: "0.75rem", sm: "1rem"}}} onClick={() => setModalOpen(true)}>Add new
                                word</Button>
                            <Button sx={{fontSize: {xs: "0.75rem", sm: "1rem"}}} disabled={!selectedRows}
                                    onClick={onDeleteWord}>Delete word{(selectedRows?.length || 0)  > 1 && 's'}</Button>
                        </Stack>
                        <ProfileDictionary setSelectedRows={setSelectedRows}/>
                        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
                            <Fade in={isModalOpen}>
                                <Box component="form" onSubmit={onSubmit} sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    maxWidth: 400,
                                    width: "100%",
                                    backgroundColor: "background.paper",
                                    borderRadius: 1,
                                    padding: 2,
                                }}>
                                    <Stack rowGap={2}>
                                        <div>
                                            <Typography variant="h3" fontSize="2rem">Word:</Typography>
                                            <TextField value={word}
                                                       onChange={(e) =>
                                                           onChange(e, setWord)}
                                                       label="Word" fullWidth/>
                                        </div>
                                        <div>
                                            <Typography variant="h3" fontSize="2rem">Translate:</Typography>
                                            <TextField value={translate}
                                                       onChange={(e) =>
                                                           onChange(e, setTranslate)} label="Translate" fullWidth/>
                                        </div>
                                    </Stack>
                                    <Button type="submit" sx={{marginTop: 1,}}>Add</Button>
                                </Box>
                            </Fade>
                        </Modal>
                    </>
                    :
                    <Navigate to={RouteNames.LOGIN}/>
            }
        </>
    )
}

export default ProfilePage