import { Transformer } from "@parcel/plugin"
import ejs from "ejs"

export default new Transformer({
  async loadConfig({ config }) {
    const configFile = await config.getConfig(["data.json"])

    return configFile?.contents
  },

  async transform({ asset, config }) {
    const data = config ?? {}
    const source = await asset.getCode()

    const output = ejs.render(source, data, {
      filename: asset.filePath,
    })

    asset.type = "html"
    asset.setCode(output)

    return [asset]
  },
})
