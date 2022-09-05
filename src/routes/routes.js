import config from '~/config'
import { DefaultLayout, MusicLayout, MyLayout } from '~/layouts'
import { Artist, Authentication, Home, Layout, MyInfo, Playlist, Profile } from '~/pages'

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Authentication, layout: MusicLayout },
    { path: config.routes.register, component: Authentication, layout: MusicLayout },
    { path: config.routes.playlist, component: Playlist, layout: DefaultLayout },
    { path: config.routes.artist, component: Artist, layout: DefaultLayout },
    { path: config.routes.me, component: Profile, layout: DefaultLayout },
    { path: config.routes.info, component: MyInfo, layout: DefaultLayout },
    { path: config.routes.layout, component: Layout, layout: MyLayout },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
