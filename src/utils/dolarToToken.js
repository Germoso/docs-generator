const dolarToToken = (dolar) => {
    if (dolar <= 0) return 0
    if (typeof dolar !== "number") return
    return (dolar / 0.4) * 1000
}

export default dolarToToken
