/* eslint-disable @next/next/no-img-element */
import { useTransHook } from '@/locales/hooks'
import { setModalWallet, setRedirectUrl } from '@/store/app/slice'
import { selectCurrentUser } from '@/store/user/selectors'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { communityArr, itemsSidebar } from './config'
import style from './style.module.scss'

const isActiveLink = (location: string, path: string): boolean => {
    if (path === '/') {
        return location === path
    }

    return location.startsWith(path)
}
const Sidebar = () => {
    const { dataUser: dataUserStore } = useSelector(selectCurrentUser)
    const { pathname } = useRouter()
    const { t } = useTransHook()
    const dispatch = useDispatch()

    function FLogined(e: MouseEvent, isLogin: boolean, url: string) {
        if (!(isLogin && !dataUserStore)) return
        dispatch(setModalWallet(true))
        dispatch(setRedirectUrl(url))
        e.preventDefault()
    }

    return (
        <Accordion defaultActiveKey={'0'}>
            <div
                id="mySidebar"
                className={`${style['scrollbar--hidden']} ${style['mySidebar']}`}
            >
                <div className={style['sidebar-container']}>
                    {itemsSidebar?.map((item, i) => {
                        if (item.items) {
                            return (
                                <Accordion.Item
                                    key={i}
                                    className={style['accordion-item']}
                                    eventKey={i.toString()}
                                >
                                    <Accordion.Header
                                        className={` ${style['button-focus']} ${
                                            isActiveLink(pathname, item.href)
                                                ? style['button-focus__active']
                                                : 'alo'
                                        }`}
                                    >
                                        <div
                                            className={
                                                style['icon-header-accordion']
                                            }
                                        >
                                            {isActiveLink(pathname, item.href)
                                                ? item.iconActive
                                                : item.icon}
                                        </div>
                                        <div
                                            className={`${
                                                style['list-items-link-sidebar']
                                            } ${
                                                isActiveLink(
                                                    pathname,
                                                    item.href,
                                                )
                                                    ? style[
                                                          'active-sidebar-link'
                                                      ]
                                                    : 'alo'
                                            }`}
                                        >
                                            {t(item.label)}
                                        </div>
                                    </Accordion.Header>

                                    {item.items.map((itemSub, index) => {
                                        return itemSub.isOpenNewTab ? (
                                            <Link
                                                key={index}
                                                href={itemSub.href}
                                            >
                                                <a
                                                    target="_blank"
                                                    onClick={(e) =>
                                                        FLogined(
                                                            e as any,
                                                            !!itemSub.isLogin,
                                                            itemSub.href,
                                                        )
                                                    }
                                                >
                                                    <Accordion.Body
                                                        className={
                                                            style[
                                                                itemSub.href ===
                                                                pathname
                                                                    ? 'accordion-item__active'
                                                                    : 'item-accordion'
                                                            ]
                                                        }
                                                    >
                                                        {itemSub.icon ? (
                                                            <>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            'item-icon-accordion'
                                                                        ]
                                                                    }
                                                                >
                                                                    {
                                                                        itemSub.icon
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {t(
                                                                        itemSub.label,
                                                                    )}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            itemSub.href ===
                                                                            pathname
                                                                                ? 'dot-accordion__active'
                                                                                : 'dot-accordion'
                                                                        ]
                                                                    }
                                                                ></div>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            'item-icon-accordion'
                                                                        ]
                                                                    }
                                                                >
                                                                    {
                                                                        itemSub.icon
                                                                    }
                                                                </div>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            'itemSub-label'
                                                                        ]
                                                                    }
                                                                >
                                                                    {t(
                                                                        itemSub.label,
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}
                                                    </Accordion.Body>
                                                </a>
                                            </Link>
                                        ) : (
                                            <Link
                                                key={index}
                                                href={itemSub.href}
                                            >
                                                <a
                                                    onClick={(e) =>
                                                        FLogined(
                                                            e as any,
                                                            !!itemSub.isLogin,
                                                            itemSub.href,
                                                        )
                                                    }
                                                >
                                                    <Accordion.Body
                                                        className={
                                                            style[
                                                                itemSub.href ===
                                                                pathname
                                                                    ? 'accordion-item__active'
                                                                    : 'item-accordion'
                                                            ]
                                                        }
                                                    >
                                                        {itemSub.icon ? (
                                                            <>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            'item-icon-accordion'
                                                                        ]
                                                                    }
                                                                >
                                                                    {
                                                                        itemSub.icon
                                                                    }
                                                                </div>
                                                                <div
                                                                    //   className={style['itemSub-label']}

                                                                    className={` ${
                                                                        isActiveLink(
                                                                            pathname,
                                                                            itemSub.href,
                                                                        )
                                                                            ? style[
                                                                                  'itemSub-label__active'
                                                                              ]
                                                                            : style[
                                                                                  'itemSub-label'
                                                                              ]
                                                                    }`}
                                                                >
                                                                    {t(
                                                                        itemSub.label,
                                                                    )}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            itemSub.href ===
                                                                            pathname
                                                                                ? 'dot-accordion__active'
                                                                                : 'dot-accordion'
                                                                        ]
                                                                    }
                                                                ></div>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            'item-icon-accordion'
                                                                        ]
                                                                    }
                                                                >
                                                                    {
                                                                        itemSub.icon
                                                                    }
                                                                </div>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            'itemSub-label'
                                                                        ]
                                                                    }
                                                                >
                                                                    {t(
                                                                        itemSub.label,
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}
                                                    </Accordion.Body>
                                                </a>
                                            </Link>
                                        )
                                    })}
                                </Accordion.Item>
                            )
                        } else {
                            return (
                                <div
                                    className={style['title-list-items-page']}
                                    key={i}
                                >
                                    {item.isOpenNewTab ? (
                                        <Link href={item.href}>
                                            <a
                                                target="_blank"
                                                className={` ${
                                                    isActiveLink(
                                                        pathname,
                                                        item.href,
                                                    )
                                                        ? style[
                                                              'list-items-link-sidebar__active'
                                                          ]
                                                        : style[
                                                              'list-items-link-sidebar'
                                                          ]
                                                }`}
                                                onClick={(e) =>
                                                    FLogined(
                                                        e as any,
                                                        !!item.isLogin,
                                                        item.href,
                                                    )
                                                }
                                            >
                                                <div
                                                    className={
                                                        style[
                                                            'title-list-icon-sidebar'
                                                        ]
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            style[
                                                                'title-list-name-sidebar'
                                                            ]
                                                        }
                                                    >
                                                        {isActiveLink(
                                                            pathname,
                                                            item.href,
                                                        )
                                                            ? item.iconActive
                                                            : item.icon}
                                                    </div>

                                                    {t(item.label)}
                                                </div>
                                            </a>
                                        </Link>
                                    ) : (
                                        <Link href={item.href}>
                                            <a
                                                className={` ${
                                                    isActiveLink(
                                                        pathname,
                                                        item.href,
                                                    )
                                                        ? style[
                                                              'list-items-link-sidebar__active'
                                                          ]
                                                        : style[
                                                              'list-items-link-sidebar'
                                                          ]
                                                }`}
                                                onClick={(e) =>
                                                    FLogined(
                                                        e as any,
                                                        !!item.isLogin,
                                                        item.href,
                                                    )
                                                }
                                            >
                                                <div
                                                    className={
                                                        style[
                                                            'title-list-icon-sidebar'
                                                        ]
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            style[
                                                                'title-list-name-sidebar'
                                                            ]
                                                        }
                                                    >
                                                        {isActiveLink(
                                                            pathname,
                                                            item.href,
                                                        )
                                                            ? item.iconActive
                                                            : item.icon}
                                                    </div>

                                                    {t(item.label)}
                                                </div>
                                            </a>
                                        </Link>
                                    )}
                                </div>
                            )
                        }
                    })}
                    {communityArr.map(
                        (item, i) =>
                            item.items && (
                                <Accordion.Item
                                    key={i}
                                    className={style['accordion-item']}
                                    eventKey={'0'}
                                >
                                    <Accordion.Header
                                        className={` ${style['button-focus']} ${
                                            isActiveLink(pathname, item.href)
                                                ? style['button-focus__active']
                                                : 'alo'
                                        }`}
                                    >
                                        <div
                                            className={
                                                style['icon-header-accordion']
                                            }
                                        >
                                            {isActiveLink(pathname, item.href)
                                                ? item.iconActive
                                                : item.icon}
                                        </div>
                                        <div
                                            className={`${
                                                style['list-items-link-sidebar']
                                            } ${
                                                isActiveLink(
                                                    pathname,
                                                    item.href,
                                                )
                                                    ? style[
                                                          'active-sidebar-link'
                                                      ]
                                                    : 'alo'
                                            }`}
                                        >
                                            {t(item.label)}
                                        </div>
                                    </Accordion.Header>

                                    {item.items.map((itemSub, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={itemSub.href}
                                            >
                                                <a
                                                    target="_blank"
                                                    onClick={(e) =>
                                                        FLogined(
                                                            e as any,
                                                            !!itemSub.isLogin,
                                                            itemSub.href,
                                                        )
                                                    }
                                                >
                                                    <Accordion.Body
                                                        className={
                                                            style[
                                                                itemSub.href ===
                                                                pathname
                                                                    ? 'accordion-item__active'
                                                                    : 'item-accordion'
                                                            ]
                                                        }
                                                    >
                                                        {true ? (
                                                            <>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            'item-icon-accordion'
                                                                        ]
                                                                    }
                                                                >
                                                                    {
                                                                        itemSub.icon
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {t(
                                                                        itemSub.label,
                                                                    )}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            itemSub.href ===
                                                                            pathname
                                                                                ? 'dot-accordion__active'
                                                                                : 'dot-accordion'
                                                                        ]
                                                                    }
                                                                ></div>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            'item-icon-accordion'
                                                                        ]
                                                                    }
                                                                >
                                                                    {
                                                                        itemSub.icon
                                                                    }
                                                                </div>
                                                                <div
                                                                    className={
                                                                        style[
                                                                            'itemSub-label'
                                                                        ]
                                                                    }
                                                                >
                                                                    {t(
                                                                        itemSub.label,
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}
                                                    </Accordion.Body>
                                                </a>
                                            </Link>
                                        )
                                    })}
                                </Accordion.Item>
                            ),
                    )}
                </div>
            </div>
        </Accordion>
    )
}

export default Sidebar
