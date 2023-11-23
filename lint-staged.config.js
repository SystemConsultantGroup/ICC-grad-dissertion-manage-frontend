const lintStagedConfig = {
  "**/*.ts?(x)": () => "tsc-files -p tsconfig.json --noEmit --pretty",
}

module.exports = lintStagedConfig
