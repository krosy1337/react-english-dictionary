import React, {FC, forwardRef, PropsWithChildren} from 'react'
import {AnimatePresence, motion} from "framer-motion"
import {Typography} from "@mui/material"

interface CustomWordProps {
    text: string | undefined
    id: number
}

const RawWord = forwardRef<HTMLDivElement, PropsWithChildren<{text: string | undefined}>>(({text}, ref) => {
    return (
        <Typography sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "2rem", margin: "auto",}} ref={ref} variant="h3" component="div"
                    textAlign="center">{text}</Typography>
    )
})

const MotionWord = motion(RawWord)

const CustomWord: FC<CustomWordProps> = ({text, id}) => {
    const variants = {
        visible: {
            scale: 1,
            top: "50%",
            y: "-50%",
            x: "-50%",
            opacity: 1,
        },
        in: {
            scale: 0,
            top: "-50%",
            x: "-50%",
        },
        out: {
            scale: 0,
            top: "100%",
            x: "-50%",
        },
    }
    return (
        <AnimatePresence initial>
            <MotionWord key={id} text={text} initial="in" animate="visible" exit="out" variants={variants}/>
        </AnimatePresence>
    )
}

export default CustomWord