const extractModelsFromText = async (textToConvert) => {
    const extractHeadersModelsFromText = () => {
        const extractHeaderModelFromText = (i) => {
            const headerRegex = new RegExp(`<h${i}>(.*?)<\/h${i}>`)
            const match = textToConvert.match(headerRegex)
            if (match) {
                const header = match[1]
                textToConvert = textToConvert
                    .replace(headerRegex, "")
                    .trim()
                    .replace(/(\r\n|\n|\r)/gm, "")
                if (match.length > 0) {
                    return {
                        type: "header",
                        data: {
                            text: header,
                            level: i,
                        },
                    }
                }
            }
        }
        for (let i = 1; i <= 6; i++) {
            const header = extractHeaderModelFromText(i)
            if (header) return header
        }
    }

    const extractParagraphModelFromText = () => {
        const paragraphRegex = /<p>(.*?)<\/p>/
        const match = textToConvert.match(paragraphRegex)
        if (match) {
            const paragraph = match[1]
            textToConvert = textToConvert
                .replace(paragraphRegex, "")
                .trim()
                .replace(/(\r\n|\n|\r)/gm, "")

            if (match.length > 0) {
                return {
                    type: "paragraph",
                    data: {
                        text: paragraph,
                        level: 2,
                    },
                }
            }
        }
    }

    return new Promise((resolve, reject) => {
        const blocks = []
        if (textToConvert) {
            const interval = setInterval(() => {
                const headerModel = extractHeadersModelsFromText()
                if (headerModel) blocks.push(headerModel)
                const paragraphModel = extractParagraphModelFromText()
                if (paragraphModel) blocks.push(paragraphModel)
            }, 100)
            setTimeout(async () => {
                clearInterval(interval)
                console.log(blocks)
                console.log(blocks)
                resolve(blocks)
            }, 3000)
        }
    })
}

export { extractModelsFromText }
