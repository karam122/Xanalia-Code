import { useTransHook } from '@/locales/hooks'
import { useState, useEffect } from 'react'
import { FormControl, FormSelect } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
    selectError,
    selectGeneralInfo,
    selectNetworkInfo,
} from '@/store/nft/selectors'
import { updateGeneralInfo } from '@/store/nft/createSlice'
import collectionServices from '@/services/collection'
import { selectCurrentUser } from '@/store/user/selectors'

const GeneralInformation = () => {
    const data = useSelector(selectGeneralInfo)
    const dispatch = useDispatch()
    const [collections, setCollections] = useState<any[]>([])
    const networkInfo = useSelector(selectNetworkInfo)
    const user = useSelector(selectCurrentUser)
    const dataUser = user?.dataUser
    const error = useSelector(selectError('generalInfo')) as {
        name: string
    }
    useEffect(() => {
        const fetchCollections = async () => {
            const collectionList = await collectionServices.getSelfCollections({
                networkId: networkInfo.chainId,
            })
            if (collectionList?.data?.length) {
                setCollections(collectionList?.data)
                dispatch(
                    updateGeneralInfo({
                        ...data,
                        collectionId: collectionList?.data[0].id,
                    }),
                )
            }
        }
        if (networkInfo.chainId !== 0) {
            fetchCollections()
        }
    }, [networkInfo.chainId, dataUser])

    useEffect(() => {
        if (data.collectionId === 0 || Number(data.collectionId) === 0) {
            if (collections.length > 0) {
                dispatch(
                    updateGeneralInfo({
                        ...data,
                        collectionId: collections[0].id,
                    }),
                )
            } else {
                // const fetchCollections = async () => {
                //     const collectionList =
                //         await collectionServices.getCollections({
                //             networkId: networkInfo.chainId,
                //             status: 1,
                //         })
                //     if (collectionList?.data?.length) {
                //         setCollections(collectionList?.data)
                //         dispatch(
                //             updateGeneralInfo({
                //                 ...data,
                //                 collectionId: collectionList?.data[0].id,
                //             }),
                //         )
                //     }
                // }
                // if (networkInfo.chainId !== 0) {
                //     fetchCollections()
                // }
            }
        }
    }, [data.collectionId])

    const onUpdateGeneralInfo = (e: any) => {
        const name = e.target.name
        dispatch(updateGeneralInfo({ ...data, [name]: e.target.value }))
    }

    const { t } = useTransHook()
    return (
        <div className="panel">
            <div className="form-group">
                <div className="form-title">
                    <div className="main-title">{t('NAME')}</div>
                    <div className="sub-title">{data.name.length}/1000</div>
                </div>
                <div className="form-input">
                    <FormControl
                        name="name"
                        value={data.name}
                        type="text"
                        onChange={onUpdateGeneralInfo}
                        maxLength={1000}
                    />
                </div>
                <span className="error-message">{t(error.name)}</span>
            </div>
            <div className="form-group">
                <div className="form-title">
                    <div className="main-title">{t('COLLECTION')}</div>
                </div>
                <div className="form-input">
                    <FormSelect
                        value={data.collectionId}
                        name="collectionId"
                        onChange={onUpdateGeneralInfo}
                    >
                        {collections.map((item) => (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </FormSelect>
                </div>
            </div>
            <div className="form-group">
                <div className="form-title">
                    <div className="main-title">{t('DESCRIPTION')}</div>
                    <div className="sub-title">
                        {data.description.length}/1000
                    </div>
                </div>
                <div className="form-input">
                    <FormControl
                        name="description"
                        value={data.description}
                        as="textarea"
                        rows={6}
                        onChange={onUpdateGeneralInfo}
                        maxLength={1000}
                    />
                </div>
            </div>
        </div>
    )
}

export default GeneralInformation
