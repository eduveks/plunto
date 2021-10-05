const pluntoConfig = () => {
    const dbConfigKey = _db.queryFirst(`SELECT * FROM configuration_key WHERE code = ? AND active = true`, key)
    if (dbConfigKey) {
        const dbConfig = _db.queryFirst(`SELECT * FROM configuration WHERE key_id = ? AND active = true`, dbConfigKey.getInt('id'))
        if (dbConfig) {
            return dbConfig.getString('value')
        }
        return defaultValue
    } else {
        _error.warn(`Configuration key ${key} not found.`)
    }
}
