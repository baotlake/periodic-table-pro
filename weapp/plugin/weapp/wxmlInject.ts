import { Weapp } from '@tarojs/plugin-platform-weapp'
import type { IPluginContext } from '@tarojs/service'
import type { IOptions } from '@tarojs/plugin-platform-weapp'
import { resolve } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'


interface Options extends IOptions {
    prefix?: string
}

export default function wxmlInject(ctx: IPluginContext, options: IOptions) {

    ctx.registerPlatform({
        name: 'miniprogram',
        useConfigName: 'mini',
        async fn({ config }) {
            config.onBuildFinish = ({ stats }) => {
                stats?.compilation?.entries?.forEach((entry) => {
                    if (entry.miniType !== 'PAGE') return

                    const wxmlPath = resolve(
                        config?.outputRoot ?? 'dist',
                        entry.name + '.wxml'
    )
                    if (!existsSync(wxmlPath)) return

                    const wxmlContent = readFileSync(wxmlPath)
                    const prefixContent = readFileSync(resolve(__dirname, './prefix.wxml')) + ''

                    writeFileSync(wxmlPath, prefixContent + wxmlContent)
                })
            }

            const program = new Weapp(ctx, config, options || {})
            await program.start()
        }
    })

    // ctx.onBuildFinish(()=>{
    //     const platfrom = ctx.runOpts.platform ?? ctx.runOpts.options.platform

    //     console.log('🐯🐯: ', platfrom, ctx, options)
    // })
}