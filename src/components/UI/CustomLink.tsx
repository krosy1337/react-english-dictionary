import React, {FC, forwardRef, PropsWithChildren} from 'react'
import {NavLink} from 'react-router-dom'
import {motion} from "framer-motion"
import {Typography} from "@mui/material"

interface RawLinkProps {
    to: string
    isActive: boolean
}

const RawLink = forwardRef<HTMLAnchorElement, PropsWithChildren<RawLinkProps>>((
    {to, isActive, children},
    ref) => {
    return (
        <NavLink ref={ref} to={to} style={{color: 'inherit', textDecoration: 'none', position: 'relative'}}>
            <Typography variant="subtitle1" component="span">{children}</Typography>
        </NavLink>
    )
})

const MotionLink = motion(RawLink)

const CustomLink: FC<RawLinkProps> = ({children, isActive, ...props}) => {
    return (
        <MotionLink {...props} isActive={isActive}>
            {isActive && <ActiveLine />}
            {children}
        </MotionLink>
    )
}

const ActiveLine: FC = () => {
    return (
        <motion.div layoutId="active" style={{
            width: '90%',
            height: 2,
            position: 'absolute',
            left: '5%',
            bottom: 0,
            backgroundColor: '#fff'
        }} transition={{duration: .2}} />
    )
}

export default CustomLink