const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Monorepo: watch shared packages
config.watchFolders = [monorepoRoot];

// Monorepo: resolve node_modules from both project and root
// IMPORTANT: project-level comes first so local versions win
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Force critical packages to resolve from mobile's own node_modules
// This prevents version conflicts with Next.js packages hoisted to root
const forcedModules = {
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-dom': path.resolve(projectRoot, 'node_modules/react-dom'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-web': path.resolve(projectRoot, 'node_modules/react-native-web'),
};

const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Check if this is a top-level import of a forced module
  if (forcedModules[moduleName]) {
    return {
      type: 'sourceFile',
      filePath: require.resolve(moduleName, { paths: [path.resolve(projectRoot, 'node_modules')] }),
    };
  }
  // Also handle subpath imports like 'react-dom/client'
  for (const [pkg, pkgPath] of Object.entries(forcedModules)) {
    if (moduleName.startsWith(pkg + '/')) {
      const subpath = moduleName.slice(pkg.length);
      const resolved = path.join(path.dirname(pkgPath), pkg, subpath);
      try {
        const filePath = require.resolve(resolved);
        return { type: 'sourceFile', filePath };
      } catch {
        // Fall through to default resolution
      }
    }
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
