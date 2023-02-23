const dolarToToken = (dolar) => {
    if (dolar <= 0 || dolar > 10) return 0
    if (typeof dolar !== "number") return 0
    return (dolar / 0.4) * 1000
}

describe("Convertir cantidad en dolares a cantidad en tokens", () => {
    test("deberia retornar 0 si hay 0 dolares", () => {
        expect(dolarToToken(0)).toBe(0)
    })
    test("deberia retornar 0 si hay un numero negativo", () => {
        expect(dolarToToken(-1)).toBe(0)
    })
    test("deberia retornar 0 si no es un numero", () => {
        expect(dolarToToken("")).toBe(0)
    })
    test("deberia retornar 5000 si son 5", () => {
        expect(dolarToToken(2)).toBe(5000)
    })
    test("deberia retornar 1000 si se ingresa 0.40", () => {
        expect(dolarToToken(0.4)).toBe(1000)
    })
    test("deberia retornar 0 si dolar = true", () => {
        expect(dolarToToken(true)).toBe(0)
    })
    test("deberia retornar 0 si dolar > 10", () => {
        expect(dolarToToken(10.1)).toBe(0)
    })
})
