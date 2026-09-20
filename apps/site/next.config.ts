import type {NextConfig} from 'next'

const config: NextConfig = {
  typedRoutes: false,
  outputFileTracingIncludes: {
    '/docs/**': ['./src/content/**/*'],
  },
}

export default config
