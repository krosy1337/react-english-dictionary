export interface IWord {
    text: string[]
}

export interface ITranslate {
    id: string
    words: IWord[]
}

export type IDictionary = ITranslate[]

export interface IFinallyTranslate {
    id: string
    word: string
    currentTranslate: string
    translate: string
    isCorrect: boolean
}

export type IFinallyDictionary = IFinallyTranslate[]