function requied(val: any) {
    if (
        !val ||
        typeof val === 'undefined' ||
        (typeof val === 'string' && !val.trim().length)
    ) {
        return false
    }

    return true
}

function userName(val: any, { min = 6, max = 32 }) {
    const regex = new RegExp(
        `^(?=.{${min},${max}}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$`,
    )
    if (!(requied(val) && regex.test(val))) return false

    return true
}

function email(val: any) {
    const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!(requied(val) && regex.test(val))) return false

    return true
}

function link(val: any) {
    const regex =
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    if (!(requied(val) && regex.test(val))) return false

    return true
}

const validation = {
    requied,
    userName,
    email,
    link,
}

export default validation
