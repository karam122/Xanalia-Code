const path = require('path')

module.exports = {
    i18n: {
        locales: ['en', 'ko', 'ja', 'zh_hans', 'zh'],
        defaultLocale: 'en',
        defaultNS: 'common',
        localePath: path.resolve('./locales/resources'),
        reloadOnPrerender:
            process.env.NODE_ENV === 'development' ? true : false,
    },
}
