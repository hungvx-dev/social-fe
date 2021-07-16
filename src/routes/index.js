import homeRoutes from '@/modules/home/routes'
import authRoutes from '@/modules/auth/routes'
import postRoutes from '@/modules/post/routes'
import blogRoutes from '@/modules/blog/routes'
import userRoutes from '@/modules/user/routes'
import adminRoutes from '@/modules/admin/routes'

export default [...homeRoutes, ...authRoutes, ...postRoutes, ...blogRoutes, ...userRoutes, ...adminRoutes]
