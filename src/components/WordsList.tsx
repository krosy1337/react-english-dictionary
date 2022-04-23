import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {Alert, Box, Button, Snackbar, Stack, TextField, Typography} from "@mui/material"
import {IDictionary, IFinallyDictionary, IWord} from "types/dictionary"
import {getRandomInt, shuffle} from "utils"
import Result from "./Result"
import {useAppSelector} from "hooks/redux"
import CustomWord from "./UI/CustomWord"

// const wordsDictionary: IDictionary = [
//     [{language: "English", text: ["Instead"]}, {language: "Русский", text: ["Вместо"]}],
//     [{language: "English", text: ["Often"]}, {language: "Русский", text: ["Часто"]}],
//     [{language: "English", text: ["Hurry"]}, {language: "Русский", text: ["Торопиться", "Спешить"]}],
//     [{language: "English", text: ["Sure"]}, {language: "Русский", text: ["Конечно"]}],
//     [{language: "English", text: ["Straight"]}, {language: "Русский", text: ["Прямой"]}],
//     [{language: "English", text: ["Implement"]}, {language: "Русский", text: ["Осуществлять"]}],
//     [{language: "English", text: ["Suppose"]}, {language: "Русский", text: ["Предполагать"]}],
//     [{language: "English", text: ["Purchase"]}, {language: "Русский", text: ["Покупка"]}],
//     [{language: "English", text: ["Weak"]}, {language: "Русский", text: ["Слабый"]}],
//     [{language: "English", text: ["Internal"]}, {language: "Русский", text: ["Внутренний"]}],
//     [{language: "English", text: ["Wardrobe"]}, {language: "Русский", text: ["Шкаф для одежды"]}],
//     [{language: "English", text: ["Decision"]}, {language: "Русский", text: ["Решение"]}],
//     [{language: "English", text: ["Ought"]}, {language: "Русский", text: ["Должен"]}],
//     [{language: "English", text: ["Through"]}, {language: "Русский", text: ["Через"]}],
//     [{language: "English", text: ["Luggage"]}, {language: "Русский", text: ["Багаж"]}],
//     [{language: "English", text: ["Probably"]}, {language: "Русский", text: ["Возможно"]}],
//     [{language: "English", text: ["Customs"]}, {language: "Русский", text: ["Таможня"]}],
//     [{language: "English", text: ["Rather"]}, {language: "Русский", text: ["Точнее"]}],
//     [{language: "English", text: ["Treatment"]}, {language: "Русский", text: ["Лечение"]}],
//     [{language: "English", text: ["Essential"]}, {language: "Русский", text: ["Существенный"]}],
//     [{language: "English", text: ["Dice"]}, {language: "Русский", text: ["Кости", "Игральные кости"]}],
//     [{language: "English", text: ["Scaffold"]}, {language: "Русский", text: ["Леса", "Строительные леса"]}],
// ]

const WordsList = () => {
    const {dictionary} = useAppSelector(state => state.user)
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1)
    const [currentWord, setCurrentWord] = useState<IWord | null>(null)
    const [currentTranslate, setCurrentTranslate] = useState<IWord | null>(null)
    const [totalCorrect, setTotalCorrect] = useState<number>(0)
    const [isCorrect, setCorrect] = useState<boolean>(false)
    const [isFinished, setFinished] = useState<boolean>(false)
    const [isSnackVisible, setSnackVisible] = useState<boolean>(false)
    const [finallyList, setFinallyList] = useState<IFinallyDictionary>([] as IFinallyDictionary)
    const [answer, setAnswer] = useState<string>('')
    const [shuffledDictionary, setShuffledDictionary] = useState<IDictionary>(dictionary ? dictionary : [] as IDictionary)

    useEffect(() => {
        if (currentWordIndex < 0 || !shuffledDictionary) {
            return
        }
        const shuffledTranslate: IWord[] = shuffle(shuffledDictionary[currentWordIndex].words)
        if (shuffledTranslate[0].text.length > 1) {
            setCurrentWord({...shuffledTranslate[0], text: shuffle(shuffledTranslate[0].text)})
        } else {
            setCurrentWord(shuffledTranslate[0])
        }
        setCurrentTranslate(shuffledTranslate[getRandomInt(1, shuffledTranslate.length - 1)])
    }, [currentWordIndex, shuffledDictionary])

    const startHandler = () => {
        if (dictionary) {
            setCurrentWordIndex(0)
            setTotalCorrect(0)
            setShuffledDictionary(shuffle(dictionary))
            setFinallyList([] as IFinallyDictionary)
        }
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const onNextWord = () => {
        if (!currentTranslate || !currentWord) {
            return
        }
        const lowerCurrentTranslate = {...currentTranslate, text: currentTranslate.text.map(w => w.toLowerCase())}
        if (lowerCurrentTranslate.text.includes(answer.toLowerCase())) {
            if (!dictionary) {
                return
            }
            setTotalCorrect(prevState => prevState + 1)
            setCorrect(true)
            setFinallyList(prevState => [...prevState, {
                id: dictionary[currentWordIndex].id,
                word: currentWord.text[0],
                translate: answer,
                currentTranslate: answer,
                isCorrect: true
            }])
        } else {
            if (!dictionary) {
                return
            }
            setCorrect(false)
            setFinallyList(prevState => [...prevState, {
                id: dictionary[currentWordIndex].id,
                word: currentWord.text[0],
                translate: answer,
                currentTranslate: currentTranslate.text[0],
                isCorrect: false,
            }])
        }
        setAnswer('')
        setSnackVisible(true)
        setCurrentWord(null)
        if (currentWordIndex === shuffledDictionary.length - 1) {
            setCurrentWordIndex(-1)
            setFinished(true)
            return
        }
        setCurrentWordIndex(prevState => prevState + 1)
    }
    const onFinishHandler = () => {
        setCurrentWordIndex(-1)
        setFinished(true)
    }

    return (
        <Box>
            {
                currentWordIndex >= 0
                    ?
                    <Stack rowGap={5} direction="column">
                        <Box sx={{
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            padding: 4,
                            minHeight: 150,
                            position: "relative"
                        }}>
                            <CustomWord id={currentWordIndex} text={currentWord?.text[0]}/>
                        </Box>
                        <Box component="form" sx={{backgroundColor: "#fff", borderRadius: 2, padding: 4,}}
                             onSubmit={(e: FormEvent<HTMLFormElement>) => {
                                 e.preventDefault()
                                 onNextWord()
                             }
                             }>
                            <TextField value={answer} onChange={onInputChange} label="Type translate" fullWidth/>
                            <Button type="submit" sx={{fontSize: "1rem", marginTop: 2,}}>Next</Button>
                            <Button sx={{fontSize: "1rem", marginTop: 2,}} onClick={onFinishHandler}>Finish</Button>
                        </Box>
                    </Stack>
                    :
                    <>
                        {
                            shuffledDictionary.length
                                ?
                                <>
                                    {isFinished && <Result finallyList={finallyList} totalCorrect={totalCorrect}/>}
                                    <Button sx={{fontSize: "1.2rem"}}
                                            onClick={startHandler}>Start</Button>
                                </>
                                :
                                <Typography variant="h1" fontSize="3rem" align="center">Ваш словарь пуст</Typography>
                        }
                    </>


            }
            <Snackbar open={isSnackVisible} autoHideDuration={1000} onClose={() => setSnackVisible(false)}
                      anchorOrigin={{
                          horizontal: "center", vertical: "top",
                      }}>
                <Alert onClose={() => setSnackVisible(false)} severity={isCorrect ? "success" : "error"}
                       sx={{width: '100%'}}>
                    {isCorrect ? "Correct!" : "Wrong!"}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default WordsList