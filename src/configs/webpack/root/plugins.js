import fs from 'fs'
import path from 'path'

import webpack from 'webpack'
import WebpackManifestPlugin from 'webpack-manifest-plugin'
import WebpackPwaManifestPlugin from 'webpack-pwa-manifest'

import _manifest from '@/configs/manifest'
import mhyConfig from '@/configs/mhy'

export default async (plugins = []) => {
    const manifest = await _manifest
    manifest.icons.map(icon => {
        const inCwdPath = path.resolve(process.cwd(), icon.src)
        if (fs.existsSync(inCwdPath)) {
            icon.src = inCwdPath
        }
        return icon
    })

    return plugins.concat([
        new WebpackPwaManifestPlugin(manifest),
        new WebpackManifestPlugin({
            fileName: './manifest.webpack.json'
        }),
        new webpack.DefinePlugin({
            mhy: JSON.stringify(await mhyConfig)
        })
    ])
}
