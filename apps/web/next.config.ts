import type {NextConfig} from 'next'

const config: NextConfig = {
  // The fixtures package ships TypeScript source rather than a build artefact,
  // so Next has to compile it alongside the app.
  transpilePackages: ['@drift/fixtures'],
  typedRoutes: true,
}

export default config
