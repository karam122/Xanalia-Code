import { ReactNode } from 'react'
import { Form, FormControlProps } from 'react-bootstrap'
import style from './style.module.scss'

interface IFieldLinkComponent {
    iconLeft?: ReactNode
    iconRight?: ReactNode
    textBottom?: string
}

const FieldLinkComponent: React.FC<FormControlProps & IFieldLinkComponent> = ({
    iconLeft,
    iconRight,
    textBottom,
    ...rest
}) => {
    return (
        <div className={style.field__link}>
            <div className={style.field__g_input}>
                {iconLeft}
                <Form.Control {...rest} />
                {iconRight}
            </div>
            <Form.Text>{textBottom}</Form.Text>
        </div>
    )
}

export default FieldLinkComponent
