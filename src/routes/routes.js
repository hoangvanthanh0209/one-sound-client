import config from '~/config'
import { DefaultLayout, MusicLayout } from '~/layouts'
import { Artist, Authentication, Home, MyPlaylist, MySong, Playlist, Profile, Search } from '~/pages'

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Authentication, layout: MusicLayout },
    { path: config.routes.register, component: Authentication, layout: MusicLayout },
    { path: config.routes.playlist, component: Playlist, layout: DefaultLayout },
    { path: config.routes.artist, component: Artist, layout: DefaultLayout },
    // { path: config.routes.me, component: Profile, layout: DefaultLayout },
    { path: config.routes.myplaylist, component: MyPlaylist, layout: DefaultLayout },
    { path: config.routes.mysong, component: MySong, layout: DefaultLayout },
    { path: config.routes.search, component: Search, layout: DefaultLayout },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
