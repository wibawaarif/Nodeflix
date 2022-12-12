const path = require('path')

const { defineConfig } = require('@vue/cli-service')
module.exports = {
  outputDir: path.resolve(__dirname, "../server/app/views"),
}
,defineConfig({
  transpileDependencies: true
})
