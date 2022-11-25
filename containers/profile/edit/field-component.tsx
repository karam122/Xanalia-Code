import { Form, FormControlProps } from 'react-bootstrap'
import style from './style.module.scss'

interface IFieldComponent {
    label?: string
    labelRight?: string
    textBottom?: string
    maxLength?: number
}

const FieldComponent: React.FC<FormControlProps & IFieldComponent> = ({
    label,
    labelRight,
    textBottom,
    ...rest
}) => {
    return (
        <Form.Group className={style.field}>
            <div className={style.field__header}>
                {label && <Form.Label>{label}</Form.Label>}
                {labelRight && <span>{labelRight}</span>}
            </div>
            <Form.Control {...rest} />
            <Form.Text>{textBottom}</Form.Text>
        </Form.Group>
    )
}

export default FieldComponent
