/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useTransHook } from '@/locales/hooks'
import { footerLinks, footerSiteMapArr, footerSocialArr } from './config'
import style from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setModalWallet, setRedirectUrl } from '@/store/app/slice'
import { selectCurrentUser } from '@/store/user/selectors'

const Footer = () => {
    const { dataUser: dataUserStore } = useSelector(selectCurrentUser)
    const { t } = useTransHook()
    const dispatch = useDispatch()

    function FLogined(e: MouseEvent, isLogin: boolean, url: string) {
        if (!(isLogin && !dataUserStore)) return
        dispatch(setModalWallet(true))
        dispatch(setRedirectUrl(url))
        e.preventDefault()
    }

    return (
        <div className={style['wrapper-outer']}>
            <div className={style['wrapper']}>
                <div className={style['footer']}>
                    <div className={style['footer__logo-text']}>
                        <img
                            className={style['footer__logo']}
                            src="/images/logo-footer.png"
                            alt="eee"
                            width={78}
                        />
                        <div className={style['footer__text']}>
                            <div>{t('XANALIADISCRIPTION1')}</div>
                            <div> {t('XANALIADISCRIPTION2')}</div>
                            <div> {t('XANALIADISCRIPTION3')}</div>
                        </div>
                    </div>
                    {footerLinks?.map((item) => (
                        <div
                            key={item.label}
                            className={style['footer__links-group']}
                        >
                            <div className={style['footer__links-title']}>
                                {t(item.label)}
                            </div>
                            {item.items.map(({ icon, label, href }) => (
                                <div
                                    className={style['footer__links-item']}
                                    key={label}
                                >
                                    {icon && (
                                        <div
                                            className={
                                                style['footer__link-item-icon']
                                            }
                                        >
                                            {icon}
                                        </div>
                                    )}
                                    {href ? (
                                        <Link href={href} passHref>
                                            <a
                                                className={
                                                    style[
                                                        'footer__link-item-href'
                                                    ]
                                                }
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                {t(label)}
                                            </a>
                                        </Link>
                                    ) : (
                                        <div>{t(label)}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    {footerSiteMapArr?.map((item) => (
                        <div
                            key={item.label}
                            className={style['footer__siteMap-links-group']}
                        >
                            <div className={style['footer__links-title']}>
                                {t(item.label)}
                            </div>
                            {item.items.map(
                                ({ icon, label, href, isLogin }) => (
                                    <div
                                        className={style['footer__links-item']}
                                        key={label}
                                    >
                                        {icon && (
                                            <div
                                                className={
                                                    style[
                                                        'footer__link-item-icon'
                                                    ]
                                                }
                                            >
                                                {icon}
                                            </div>
                                        )}
                                        {href ? (
                                            <Link href={href} passHref>
                                                <a
                                                    className={
                                                        style[
                                                            'footer__link-item-href'
                                                        ]
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    onClick={(e) =>
                                                        FLogined(
                                                            e as any,
                                                            !!isLogin,
                                                            href,
                                                        )
                                                    }
                                                >
                                                    {t(label)}
                                                </a>
                                            </Link>
                                        ) : (
                                            <div>{t(label)}</div>
                                        )}
                                    </div>
                                ),
                            )}
                        </div>
                    ))}
                    {footerSocialArr?.map((item) => (
                        <div
                            key={item.label}
                            className={style['footer__social-links-group']}
                        >
                            <div className={style['footer__links-title']}>
                                {t(item.label)}
                            </div>
                            {item.items.map(({ icon, label, href }) => (
                                <div
                                    className={style['footer__links-item']}
                                    key={label}
                                >
                                    {icon && (
                                        <div
                                            className={
                                                style['footer__link-item-icon']
                                            }
                                        >
                                            {icon}
                                        </div>
                                    )}
                                    {href ? (
                                        <Link href={href} passHref>
                                            <a
                                                className={
                                                    style[
                                                        'footer__link-item-href'
                                                    ]
                                                }
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                {t(label)}
                                            </a>
                                        </Link>
                                    ) : (
                                        <div>{t(label)}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Footer
